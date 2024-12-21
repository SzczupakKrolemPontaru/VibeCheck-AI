import React, {FC, ReactElement} from 'react';
import {translateText} from 'src/lang/TranslationUtils';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {CustomButton, CustomButtonProps} from '../CustomButton.component';
import {StyledIconForButton} from './IconForButton.style';

interface ButtonWithIconProps extends CustomButtonProps {
    icon?: IconProp;
    buttonText: string;
}

export const ButtonWithIcon: FC<ButtonWithIconProps> = (props: ButtonWithIconProps): ReactElement => {
    return <CustomButton {...props}>
        {props.icon && <StyledIconForButton icon={props.icon} />}
        {translateText(props.buttonText)}
    </CustomButton>
}