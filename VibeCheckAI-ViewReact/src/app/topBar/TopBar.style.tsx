import {VibeCheckColors} from 'src/common/colors/VibeCheckColors';
import styled from 'styled-components';

export const StyledTopBar = styled.div`
    display: flex;
    width: 100%;
    background-color: ${VibeCheckColors.white};
    align-items: center;
    height: fit-content;
    min-height: 4rem;
    border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.35);
    margin-bottom: 1.5rem;
    margin-left: 0;

    .platform-buttons {
        width: 40%;
        display: flex;
        gap: 1rem;
        flex-shrink: 0.1;
    }
`