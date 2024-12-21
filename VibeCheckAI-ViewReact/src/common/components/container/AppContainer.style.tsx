import {VibeCheckColors} from 'src/common/colors/VibeCheckColors';
import styled from 'styled-components';

export const StyledAppContainer = styled.div`
    min-height: calc(100vh - 1.5rem);
    min-width: calc(100vw - 1.5rem);
    overflow-x: hidden;
    background-color: ${VibeCheckColors.backgroundGrey};
    font-size: 1rem;
`;