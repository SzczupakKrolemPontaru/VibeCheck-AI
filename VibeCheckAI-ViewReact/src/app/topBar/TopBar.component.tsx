import {StyledTopBar} from 'App/topBar/TopBar.style';
import {ButtonWithIcon} from 'Components/button/buttonWithIcon/ButtonWithIcon.component';
import React, {FC, ReactElement} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setPlatform} from 'Redux/selectedPlatform/selectedPlatform.slice';
import {PlatformType} from 'Redux/selectedPlatform/SelectedPlatform.type';
import {AppState} from 'Redux/store';
import {faTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons';

export const TopBar: FC = (): ReactElement => {

    const dispatch = useDispatch();
    const selectedPlatform: PlatformType = useSelector((state: AppState) => state.selectedPlatform.platform);

    const changeSelectedPlatform = (platform: PlatformType) => {
        dispatch(setPlatform(platform));
    }

    return <StyledTopBar className="grid">
        <div className="col-10">

        </div>
        <div className="col-1">
            <ButtonWithIcon 
                onClick={() => {changeSelectedPlatform(PlatformType.YOUTUBE)}}
                secondary={selectedPlatform !== PlatformType.YOUTUBE}
                icon={faYoutube} 
                buttonText="YOUTUBE">
            </ButtonWithIcon>
        </div>
        <div className="col-1">
            <ButtonWithIcon
                onClick={() => {changeSelectedPlatform(PlatformType.TWITTER)}}
                secondary={selectedPlatform !== PlatformType.TWITTER}
                icon={faTwitter}
                buttonText="TWITTER">
            </ButtonWithIcon>
        </div>
    </StyledTopBar>
}