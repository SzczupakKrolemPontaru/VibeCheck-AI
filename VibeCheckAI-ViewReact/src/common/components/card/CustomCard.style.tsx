import styled from 'styled-components';
import {VibeCheckColors} from "Colors/VibeCheckColors";

interface StyledCustomCardProps {
    backgroundColor?: string;
}

export const StyledCustomCard = styled.div<StyledCustomCardProps>`
    .p-card {
        box-shadow: 0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
        border-radius: 1.25rem;
        background-color: ${(props: StyledCustomCardProps) => props.backgroundColor
                ? props.backgroundColor
                : VibeCheckColors.white
        };
    }
`;