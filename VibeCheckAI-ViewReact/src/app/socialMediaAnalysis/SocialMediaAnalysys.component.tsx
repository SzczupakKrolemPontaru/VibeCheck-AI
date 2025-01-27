import React, {FC, ReactElement} from 'react';
import {useSelector} from 'react-redux';
import {PlatformType} from 'Redux/selectedPlatform/SelectedPlatform.type';
import {RootState} from 'Redux/store';
import {translateText} from 'src/lang/TranslationUtils';
import {StyledSocialMediaAnalysis} from './SocialMediaAnalysys.style';
import {TwitterAnalysis} from './twitter/TwitterAnalysis.component';
import {YoutubeAnalysis} from './youtube/YoutubeAnalysis.component';
import {UserSubscription} from "Redux/user/UserSubscriptionLevel.type";
import {BlockUI} from "primereact/blockui";
import {CustomButton} from "Components/button/CustomButton.component";
import {useNavigate} from "react-router-dom";

interface SocialMediaAnalysisProps {
    // props
}

export const SocialMediaAnalysis: FC<SocialMediaAnalysisProps> = (props: SocialMediaAnalysisProps): ReactElement => {

    const navigate = useNavigate();

    const platformType: PlatformType = useSelector((state: RootState) => state.selectedPlatform.platform);
    const subscriptionLevel: UserSubscription = useSelector((state: RootState) => state.user.subscriptionLevel);
    const selectedPlatform: PlatformType = useSelector((state: RootState) => state.selectedPlatform.platform);

    const isBlocked = subscriptionLevel !== UserSubscription.PREMIUM && selectedPlatform === PlatformType.TWITTER;

    const platformAnalysisComponentMap: Record<PlatformType, ReactElement> = {
        [PlatformType.TWITTER]: <TwitterAnalysis />,
        [PlatformType.YOUTUBE]: <YoutubeAnalysis />
    }

    const blockUITemplate = <div style={{ textAlign: 'center' }}>
        <i className="pi pi-lock" style={{ fontSize: '3rem' }}></i>
        <div style={{ marginTop: '1rem', fontSize: '1.5rem' }}>
            {translateText("BLOCKED_MESSAGE")}
        </div>
        <CustomButton
            style={{ width: '33.3%', margin: '1rem auto' }}
            onClick={() => navigate('/subscription', {replace: true})}
        >
            {translateText("SUBSCRIBE_BUTTON")}
        </CustomButton>
    </div>

    return (
        <BlockUI blocked={isBlocked} template={blockUITemplate}>
            <StyledSocialMediaAnalysis>
                <div className="flex w-full flex-column justify-content-center align-items-center gap-3 mb-5">
                    <div className="text-6xl font-bold">{translateText("SOCIAL_MEDIA_ANALYSIS_HEADER")}</div>
                    <div className="text-2xl">{translateText("SOCIAL_MEDIA_ANALYSIS_SUB_HEADER")}</div>
                </div>
                {platformAnalysisComponentMap[platformType]}
            </StyledSocialMediaAnalysis>
        </BlockUI>
    );
}