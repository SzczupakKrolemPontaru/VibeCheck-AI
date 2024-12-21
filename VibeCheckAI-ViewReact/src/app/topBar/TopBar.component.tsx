import {StyledTopBar} from 'App/topBar/TopBar.style';
import {CustomButton} from 'Components/customButton/CustomButton.component';
import React, {FC, ReactElement} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setPlatform} from 'Redux/selectedPlatform/selectedPlatform.slice';
import {PlatformType} from 'Redux/selectedPlatform/SelectedPlatform.type';
import {AppState} from 'Redux/store';
import {translateText} from '../../lang/TranslationUtils';

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
            <CustomButton 
                onClick={() => {changeSelectedPlatform(PlatformType.YOUTUBE)}}
                secondary={selectedPlatform !== PlatformType.YOUTUBE}>
                    {translateText("YOUTUBE")}
            </CustomButton>
        </div>
        <div className="col-1">
            <CustomButton 
                onClick={() => {changeSelectedPlatform(PlatformType.TWITTER)}}
                secondary={selectedPlatform !== PlatformType.TWITTER}>
                    {translateText("TWITTER")}
            </CustomButton>
        </div>
    </StyledTopBar>
}