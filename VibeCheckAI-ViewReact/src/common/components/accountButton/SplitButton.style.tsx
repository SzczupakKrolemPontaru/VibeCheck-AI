import {VibeCheckColors} from 'Colors/VibeCheckColors';
import {SplitButton} from 'primereact/splitbutton';
import styled from 'styled-components';

export const StyledSplitButton = styled(SplitButton)`
    width: fit-content;
    flex-grow: 0;

    .p-button {
        background: ${VibeCheckColors.diagramPurple};
        border: 1px solid ${VibeCheckColors.diagramPurple};
    }

    .p-button:first-of-type {
        cursor: default;
        pointer-events: none;
    }

    .p-button:first-of-type.p-button-icon-only {
        justify-content: left;

        .p-button-icon {
            padding-left: 1rem;
        }
    }
    
    .p-button-label p-c {
        text-wrap: pretty;
    }
`