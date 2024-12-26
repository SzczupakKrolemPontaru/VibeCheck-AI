import {VibeCheckColors} from 'src/common/colors/VibeCheckColors';
import styled from 'styled-components';

export const StyledAppContainer = styled.div`
    min-height: calc(100dvh - 1.5rem);
    min-width: calc(100dvw - 1.5rem);
    overflow-x: hidden;
    background-color: ${VibeCheckColors.backgroundGrey};
    font-size: 1rem;
`;