import 'chart.js/auto';
import {LinkInput} from 'App/linkInput/LinkInput.component';
import {
ChannelInformation
} from 'App/socialMediaAnalysis/youtube/channelInformation/ChannelInformation.component';
import {CustomCard} from 'Components/card/CustomCard.component';
import {DonutChart} from 'Components/chart/donutChart/DonutChart.component';
import {Accordion} from 'primereact/accordion';
import {Image} from 'primereact/image';
import {Knob} from 'primereact/knob';
import {ProgressSpinner} from 'primereact/progressspinner';
import React, {FC, ReactElement, useMemo, useState} from 'react';
import {VibeCheckColors} from 'src/common/colors/VibeCheckColors';
import {calcRemToPx, isDefined} from 'src/common/utils/VibeCheck.utils';
import {translateText} from 'src/lang/TranslationUtils';
import {faComment, faEye, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {YouTubeAnalysisService} from './service/YouTubeAnalysis.service';
import {YouTubeAnalysisResponseDTO} from './service/YouTubeAnalysisResponse.dto';
import {StyledYoutubeAnalysis} from './YoutubeAnalysis.style';

interface YoutubeAnalysisProps {
}

export const YoutubeAnalysis: FC<YoutubeAnalysisProps> = (props: YoutubeAnalysisProps): ReactElement => {

    const [linkValue, setLinkValue] = useState<string>("");
    const [videoInformation, setVideoInformation] = useState<YouTubeAnalysisResponseDTO>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const data = useMemo(() => {
        const labels = videoInformation?.sentiments ? Object.keys(videoInformation.sentiments).map(label => translateText(label)) : [];
        const values = videoInformation?.sentiments ? Object.values(videoInformation.sentiments) : [];
        return {
            labels,
            datasets: [
                {
                    data: values,
                    backgroundColor: [VibeCheckColors.veryNegative, VibeCheckColors.negative, VibeCheckColors.neutral, VibeCheckColors.positive, VibeCheckColors.veryPositive],
                    hoverBackgroundColor: [VibeCheckColors.veryNegative, VibeCheckColors.negative, VibeCheckColors.neutral, VibeCheckColors.positive, VibeCheckColors.veryPositive],
                },
            ],
        };
    }, [videoInformation]);

    const options = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
    }), []);

    const onAnalyzeYouTubeVideo = async () => {
        setIsLoading(true);
        try {
            const data: YouTubeAnalysisResponseDTO = await YouTubeAnalysisService.getYouTubeAnalysis(linkValue);
            setVideoInformation(data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    return <StyledYoutubeAnalysis>
        <LinkInput 
            header={translateText("ANALYZE_YOUTUBE")}
            linkValue={linkValue} 
            setLinkValue={setLinkValue} 
            placeholder={translateText("YOUTUBE_LINK_INPUT_PLACEHOLDER")}
            onClick={onAnalyzeYouTubeVideo}
        />
        {isLoading ? (
            <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <ProgressSpinner />
            </div>
        ) : (
            isDefined(videoInformation) && <> 
            <div className="grid">
                <div className="col-7 h-full">
                    <CustomCard>
                        <Image
                            src={videoInformation?.videoStatisticsInfo?.thumbnailUrl ?? ''}
                            alt="Image"
                        />
                        <div>{videoInformation?.videoStatisticsInfo?.title ?? ''}</div>
                    </CustomCard>
                </div>
                <div className="col-5">
                    <div className="flex flex-column h-full gap-4">
                        <CustomCard title="CHANNEL_INFORMATION">
                            <ChannelInformation channelInformation={videoInformation?.channelInfo}/>
                        </CustomCard>
                        <div className="grid justify-content-around">
                            <CustomCard title="TOXICITY_PERCENTAGE" className="col-5 p-0 knob-container">
                                <Knob value={videoInformation?.toxicity ?? 0} />
                            </CustomCard>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid">
                <div className="col-4">
                    <CustomCard title={translateText("FEEDBACK_ANALYSIS_CHART_HEADER")}>
                        <DonutChart data={data} options={options} size={calcRemToPx(25)}/>
                    </CustomCard>
                </div>
                <div className="col-6">
                </div>
                <div className="col-6">
                    <Accordion>

                    </Accordion>
                </div>
            </div>
            <div className="performance-metrics-box">
                <div className="grid">
                    <div className="col-4">
                        <CustomCard subTitle="Views">
                            <div className="flex align-items-center gap-2">
                                <FontAwesomeIcon icon={faEye} color={VibeCheckColors.diagramPurple}/>
                                <div>{videoInformation?.videoStatisticsInfo?.viewCount?.toLocaleString() ?? '0'}</div>
                            </div>
                        </CustomCard>
                    </div>
                    <div className="col-4">
                        <CustomCard className="fle" subTitle="Likes">
                            <div className="flex align-items-center gap-2">
                                <FontAwesomeIcon icon={faThumbsUp} color={VibeCheckColors.diagramPurple}/>
                                <div>{videoInformation?.videoStatisticsInfo?.likeCount?.toLocaleString() ?? '0'}</div>
                            </div>
                        </CustomCard>
                    </div>
                    <div className="col-4">
                        <CustomCard subTitle="Comments">
                            <div className="flex align-items-center gap-2">
                                <FontAwesomeIcon icon={faComment} color={VibeCheckColors.diagramPurple}/>
                                <div>{videoInformation?.videoStatisticsInfo?.commentCount?.toLocaleString() ?? '0'}</div>
                            </div>
                        </CustomCard>
                    </div>
                </div>
            </div>
            </>
        )}
    </StyledYoutubeAnalysis>
}