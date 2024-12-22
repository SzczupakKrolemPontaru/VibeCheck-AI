import 'chart.js/auto';
import {LinkInput} from 'App/linkInput/LinkInput.component';
import {DonutChart} from 'Components/chart/donutChart/DonutChart.component';
import {Tile} from 'Components/tile/Tile.component';
import React, {FC, ReactElement, useMemo, useState} from 'react';
import {VibeCheckColors} from 'src/common/colors/VibeCheckColors';
import {calcRemToPx} from 'src/common/utils/VibeCheck.utils';
import {translateText} from 'src/lang/TranslationUtils';
import {StyledYoutubeAnalysis} from './YoutubeAnalysis.style';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faThumbsUp, faEye, faShare } from '@fortawesome/free-solid-svg-icons'
import {Card} from "primereact/card";

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
            <div className="col-4">
                <Tile title={translateText("FEEDBACK_ANALYSIS_CHART_HEADER")}>
                    <DonutChart data={data} options={options} size={calcRemToPx(25)}/>
                </Tile>
            </div>
            <div className="col-8">

            </div>
        </div>
        <div className="performance-metrics-box grid">
            <div className="col-4">
                <Card subTitle="Views">
                    <FontAwesomeIcon icon={faEye} color={VibeCheckColors.diagramPurple}/>
                    <div>1.2M</div>
                </Card>
            </div>
            <div className="col-4">
                <Card subTitle="Likes">
                    <FontAwesomeIcon icon={faThumbsUp} color={VibeCheckColors.diagramPurple}/>
                    <div>24.5K</div>
                </Card>
            </div>
            <div className="col-4">
                <Card subTitle="Shares">
                    <FontAwesomeIcon icon={faShare} color={VibeCheckColors.diagramPurple}/>
                    <div>1.8K</div>
                </Card>
            </div>
        </div>
    </StyledYoutubeAnalysis>
}