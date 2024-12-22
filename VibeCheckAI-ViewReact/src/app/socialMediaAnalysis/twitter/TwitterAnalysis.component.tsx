import {LinkInput} from 'App/linkInput/LinkInput.component';
import React, {FC, ReactElement, useState} from 'react';
import {translateText} from 'src/lang/TranslationUtils';
import {StyledTwitterAnalysis} from './TwitterAnalysis.style';

interface TwitterAnalysisProps {
}

export const TwitterAnalysis: FC<TwitterAnalysisProps> = (props: TwitterAnalysisProps): ReactElement => {

    const [linkValue, setLinkValue] = useState<string>("");

    return <StyledTwitterAnalysis>
        <LinkInput 
            header={translateText("ANALYZE_TWITTER")}
            linkValue={linkValue} 
            setLinkValue={setLinkValue} 
            placeholder={translateText("TWITTER_LINK_INPUT_PLACEHOLDER")}
        />
    </StyledTwitterAnalysis>
}