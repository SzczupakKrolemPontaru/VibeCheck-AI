import {FC, ReactElement} from "react";
import {StyledCustomLabel} from "Components/label/CustomLabel.style";
import {EMPTY_STRING} from "Utils/VibeCheck.utils";
import React from "react";
import {translateText} from "../../../lang/TranslationUtils";

interface CustomLabelProps {
    text: string;
    className?: string;
    color?: string;
    wrapText?: boolean;
}

export const CustomLabel: FC<CustomLabelProps> = (props: CustomLabelProps): ReactElement => {
    return <StyledCustomLabel className={"labelComponent " + props.className} color={props.color} wrapText={props.wrapText}>
        {translateText(props.text)}
    </StyledCustomLabel>
}

CustomLabel.defaultProps = {
    className: EMPTY_STRING
};
