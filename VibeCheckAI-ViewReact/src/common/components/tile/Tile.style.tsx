import {VibeCheckColors} from 'src/common/colors/VibeCheckColors';
import styled from 'styled-components';

interface StyledTileProps {
    backgroundColor?: string;
}

export const StyledTile = styled.div<StyledTileProps>`
    min-height: fit-content;
    min-width: fit-content;
    border-radius: 1rem;
    padding: 1rem;
    background-color: ${(props: StyledTileProps) => props.backgroundColor 
        ? props.backgroundColor 
        : VibeCheckColors.white
    };
`;