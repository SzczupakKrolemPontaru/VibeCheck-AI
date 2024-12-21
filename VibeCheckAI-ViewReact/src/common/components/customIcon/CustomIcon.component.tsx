import React, {FC, ReactElement} from 'react';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {StyledCustomIcon} from './CustomIcon.style';

interface CustomIconProps {
    icon: IconDefinition;
    iconColor?: string;
    
}

export const CustomIcon: FC<CustomIconProps> = (props: CustomIconProps): ReactElement => {
    return <StyledCustomIcon color={props.iconColor}>
        <FontAwesomeIcon icon={props.icon} />
    </StyledCustomIcon>
};