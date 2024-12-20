import React from "react";
import {FC, ReactElement} from "react";
import {PlatformType} from "Redux/selectedPlatform/SelectedPlatform.type";
import {useSelector} from "react-redux";
import {AppState} from "Redux/store";
import {CustomButton} from "Components/customButton/CustomButton.component";
import {StyledTopBar} from "App/topBar/TopBar.style";
import {translateText} from "../../lang/TranslationUtils";

export const TopBar: FC = (): ReactElement => {

    const selectedPlatform: PlatformType = useSelector((state: AppState) => state.selectedPlatform.platform);

    return <StyledTopBar className="grid">
        <div className="col-10">

        </div>
        <div className="col-1">
            <CustomButton>
                {translateText("YOUTUBE")}
            </CustomButton>
        </div>
        <div className="col-1">
            <CustomButton>
                {translateText("TWITTER")}
            </CustomButton>
        </div>
    </StyledTopBar>
}