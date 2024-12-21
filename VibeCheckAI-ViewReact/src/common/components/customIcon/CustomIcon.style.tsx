import {VibeCheckColors} from 'src/common/colors/VibeCheckColors';
import {styled} from 'styled-components';

interface StyledCustomIconProps {
    iconColor?: string;
}

export const StyledCustomIcon = styled.div<StyledCustomIconProps>`
    color: ${props => props.iconColor ? props.iconColor : VibeCheckColors.diagramPurple};
`