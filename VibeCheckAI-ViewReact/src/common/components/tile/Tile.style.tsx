import {VibeCheckColors} from 'src/common/colors/VibeCheckColors';
import styled from 'styled-components';

interface StyledTileProps {
    backgroundColor?: string;
}

export const StyledTile = styled.div<StyledTileProps>`
    height: fit-content;
    box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.1);
    width: fit-content;
    border-radius: 1rem;
    padding: 1rem;
    background-color: ${(props: StyledTileProps) => props.backgroundColor 
        ? props.backgroundColor 
        : VibeCheckColors.white
    };
`;