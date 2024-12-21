import {LinkInput} from 'App/linkInput/LinkInput.component';
import React, {FC, ReactElement, useState} from 'react';
import {translateText} from 'src/lang/TranslationUtils';
import {StyledTwitterStatistics} from './TwitterStatistics.style';

interface TwitterStatisticsProps {
}

export const YoutubeStatistics: FC<TwitterStatisticsProps> = (props: TwitterStatisticsProps): ReactElement => {

    const [linkValue, setLinkValue] = useState<string>("");

    return <StyledTwitterStatistics>
        <LinkInput 
            header={translateText("ANALYZE_TWITTER")}
            linkValue={linkValue} 
            setLinkValue={setLinkValue} 
            placeholder={translateText("TWITTER_LINK_INPUT_PLACEHOLDER")}
        />
    </StyledTwitterStatistics>
}