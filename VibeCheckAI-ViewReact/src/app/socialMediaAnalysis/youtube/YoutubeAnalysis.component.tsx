import 'chart.js/auto';
import {LinkInput} from 'App/linkInput/LinkInput.component';
import {DonutChart} from 'Components/chart/donutChart/DonutChart.component';
import {Tile} from 'Components/tile/Tile.component';
import React, {FC, ReactElement, useMemo, useState} from 'react';
import {VibeCheckColors} from 'src/common/colors/VibeCheckColors';
import {calcRemToPx} from 'src/common/utils/VibeCheck.utils';
import {translateText} from 'src/lang/TranslationUtils';
import {StyledYoutubeAnalysis} from './YoutubeAnalysis.style';

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
        <Tile>
            <DonutChart data={data} options={options} chartHeight={calcRemToPx(25)} chartWidth={calcRemToPx(25)}/>
        </Tile>
    </StyledYoutubeAnalysis>
}