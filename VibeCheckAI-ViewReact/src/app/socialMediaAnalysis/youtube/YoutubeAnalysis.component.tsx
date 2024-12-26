import 'chart.js/auto';
import {LinkInput} from 'App/linkInput/LinkInput.component';
import {DonutChart} from 'Components/chart/donutChart/DonutChart.component';
import {CustomCard} from 'Components/card/CustomCard.component';
import React, {FC, ReactElement, useMemo, useState} from 'react';
import {VibeCheckColors} from 'src/common/colors/VibeCheckColors';
import {calcRemToPx} from 'src/common/utils/VibeCheck.utils';
import {translateText} from 'src/lang/TranslationUtils';
import {StyledYoutubeAnalysis} from './YoutubeAnalysis.style';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faThumbsUp, faEye, faComment } from '@fortawesome/free-solid-svg-icons'
import {Image} from "primereact/image";
import {Accordion} from "primereact/accordion";
import {ChannelInformation} from "App/socialMediaAnalysis/youtube/ChannelInformation.component";
import {InitialChannelInformation} from "App/socialMediaAnalysis/youtube/service/ChannelInformation.dto";

interface YoutubeAnalysisProps {
}

export const YoutubeAnalysis: FC<YoutubeAnalysisProps> = (props: YoutubeAnalysisProps): ReactElement => {

    const [linkValue, setLinkValue] = useState<string>("");

    const data = useMemo(() => ({
        labels: ['Negative', 'Positive', 'Neutral'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [VibeCheckColors.negative, VibeCheckColors.positive, VibeCheckColors.lightBlue],
                hoverBackgroundColor: [VibeCheckColors.negative, VibeCheckColors.positive, VibeCheckColors.lightBlue],
            },
        ],
    }), []);
    
    const options = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
    }), []);

    return <StyledYoutubeAnalysis>
        <LinkInput 
            header={translateText("ANALYZE_YOUTUBE")}
            linkValue={linkValue} 
            setLinkValue={setLinkValue} 
            placeholder={translateText("YOUTUBE_LINK_INPUT_PLACEHOLDER")}
        />
        <div className="grid">
            <div className="col-7">
                <CustomCard>
                    <Image
                        src="https://i.ytimg.com/vi/rkOowmP1mHc/maxresdefault.jpg"
                        alt="Image"
                        style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'cover'}}
                    />
                    <p>🔥 MIX DO GRANIA ZYRĄ *poradnik dla ogrodników*</p>
                </CustomCard>
            </div>
            <div className="col-5">
                <CustomCard title="Channel Information">
                    <ChannelInformation channelInformation={InitialChannelInformation}/>
                </CustomCard>
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
            <div style={{fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem'}}> Video statistics</div>
            <div className="grid">
                <div className="col-4">
                    <CustomCard subTitle="Views">
                        <div className="flex align-items-center gap-2">
                            <FontAwesomeIcon icon={faEye} color={VibeCheckColors.diagramPurple}/>
                            <div>1.2M</div>
                        </div>
                    </CustomCard>
                </div>
                <div className="col-4">
                    <CustomCard className="fle" subTitle="Likes">
                        <div className="flex align-items-center gap-2">
                            <FontAwesomeIcon icon={faThumbsUp} color={VibeCheckColors.diagramPurple}/>
                            <div>24.5K</div>
                        </div>
                    </CustomCard>
                </div>
                <div className="col-4">
                    <CustomCard subTitle="Comments">
                        <div className="flex align-items-center gap-2">
                            <FontAwesomeIcon icon={faComment} color={VibeCheckColors.diagramPurple}/>
                            <div>1.8K</div>
                        </div>
                    </CustomCard>
                </div>
            </div>
        </div>
    </StyledYoutubeAnalysis>
}