import {LinkInput} from 'App/linkInput/LinkInput.component';
import React, {FC, ReactElement, useState} from 'react';
import {translateText} from 'src/lang/TranslationUtils';
import {StyledYoutubeStatistics} from './YoutubeStatistics.style';

interface YoutubeStatisticsProps {
}

export const YoutubeStatistics: FC<YoutubeStatisticsProps> = (props: YoutubeStatisticsProps): ReactElement => {

    const [linkValue, setLinkValue] = useState<string>("");

    return <StyledYoutubeStatistics>
        <LinkInput 
            header={translateText("ANALYZE_YOUTUBE")}
            linkValue={linkValue} 
            setLinkValue={setLinkValue} 
            placeholder={translateText("YOUTUBE_LINK_INPUT_PLACEHOLDER")}
        />
    </StyledYoutubeStatistics>
}