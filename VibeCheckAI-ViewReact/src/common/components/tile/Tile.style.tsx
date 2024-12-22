import {VibeCheckColors} from 'src/common/colors/VibeCheckColors';
import styled from 'styled-components';

interface StyledTileProps {
    backgroundColor?: string;
}

export const StyledTile = styled.div<StyledTileProps>`
    //height: fit-content;
    box-shadow: 0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
    //width: fit-content;
    border-radius: 1.25rem;
    background-color: ${(props: StyledTileProps) => props.backgroundColor 
        ? props.backgroundColor 
        : VibeCheckColors.white
    };
`;