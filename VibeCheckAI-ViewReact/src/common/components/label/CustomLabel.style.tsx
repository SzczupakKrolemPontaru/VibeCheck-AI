import styled from "styled-components";

interface StyledCustomLabelProps {
    color?: string;
    wrapText?: boolean;
}
export const StyledCustomLabel = styled.div<StyledCustomLabelProps>`
    font-size: 0.8rem;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
`