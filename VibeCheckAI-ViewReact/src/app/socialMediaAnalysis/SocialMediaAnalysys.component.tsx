import React, {FC, ReactElement} from 'react';
import {useSelector} from 'react-redux';
import {PlatformType} from 'Redux/selectedPlatform/SelectedPlatform.type';
import {RootState} from 'Redux/store';
import {translateText} from 'src/lang/TranslationUtils';
import {StyledSocialMediaAnalysis} from './SocialMediaAnalysys.style';
import {TwitterAnalysis} from './twitter/TwitterAnalysis.component';
import {YoutubeAnalysis} from './youtube/YoutubeAnalysis.component';

interface SocialMediaAnalysisProps {
    // props
}

export const SocialMediaAnalysis: FC<SocialMediaAnalysisProps> = (props: SocialMediaAnalysisProps): ReactElement => {

    const platformType: PlatformType = useSelector((state: RootState) => state.selectedPlatform.platform);

    const platformAnalysisComponentMap: Record<PlatformType, ReactElement> = {
        [PlatformType.TWITTER]: <TwitterAnalysis />,
        [PlatformType.YOUTUBE]: <YoutubeAnalysis />
    }

    return <StyledSocialMediaAnalysis>
        <div className="flex w-full flex-column justify-content-center align-items-center gap-3 mb-5">
            <div className="text-6xl font-bold">{translateText("SOCIAL_MEDIA_ANALYSIS_HEADER")}</div>
            <div className="text-2xl">{translateText("SOCIAL_MEDIA_ANALYSIS_SUB_HEADER")}</div>
        </div>
        {platformAnalysisComponentMap[platformType]}
    </StyledSocialMediaAnalysis>
}
