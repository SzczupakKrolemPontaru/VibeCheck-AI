import {StyledTopBar} from 'App/topBar/TopBar.style';
import {AccountButton} from 'Components/accountButton/AccountButton.component';
import React, {FC, ReactElement} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setPlatform} from 'Redux/selectedPlatform/selectedPlatform.slice';
import {PlatformType} from 'Redux/selectedPlatform/SelectedPlatform.type';
import {RootState} from 'Redux/store';
import {CustomButton} from "Components/button/CustomButton.component";
import {VibeCheckColors} from "Colors/VibeCheckColors";
import {useNavigate} from "react-router-dom";
import {translateText} from "../../lang/TranslationUtils";

export const TopBar: FC = (): ReactElement => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedPlatform: PlatformType = useSelector((state: RootState) => state.selectedPlatform.platform);

    const changeSelectedPlatform = (platform: PlatformType) => {
        dispatch(setPlatform({ platform }));
    }

    return <StyledTopBar className="grid">
        <div className="col-1">
            <CustomButton style={{backgroundColor: VibeCheckColors.transparent, border: 'none'}}
                          onClick={() => navigate('/socialMediaAnalysis', {replace: true})}>
                <img alt="logo" src="/logo.png" className="h-fit"></img>
            </CustomButton>
        </div>
        <div className="col-7">

        </div>
        <div className="col-4 flex gap-4 align-items-center justify-content-end">
            <div className="platform-buttons">
                <CustomButton
                    className='h-full'
                    onClick={() => {changeSelectedPlatform(PlatformType.YOUTUBE)}}
                    secondary={selectedPlatform !== PlatformType.YOUTUBE}
                    icon='pi pi-facebook' iconPos='left'>
                        {translateText("YOUTUBE")}
                </CustomButton>
                <CustomButton
                    className='h-full'
                    onClick={() => {changeSelectedPlatform(PlatformType.TWITTER)}}
                    secondary={selectedPlatform !== PlatformType.TWITTER}
                    icon='pi-twitter'>
                        {translateText("TWITTER")}
                </CustomButton>
            </div>
            <AccountButton/>
        </div>
    </StyledTopBar>
}