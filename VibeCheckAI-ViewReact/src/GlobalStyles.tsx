import {VibeCheckColors} from 'Colors/VibeCheckColors';
import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    .p-menu {
        background-color: ${VibeCheckColors.white};
        border: 1px solid ${VibeCheckColors.lightGrey};
    }

    .p-menuitem-text {
        color: ${VibeCheckColors.darkGrey};
    }

    .p-button:focus {
        box-shadow: 0 0 0 0.2rem ${VibeCheckColors.diagramPurple};
    }

    .p-confirm-popup .p-button {
        background-color: ${VibeCheckColors.diagramPurple};
        border-color: ${VibeCheckColors.diagramPurple};
    }
    
    .p-confirm-popup .p-confirm-popup-reject {
        background-color: ${VibeCheckColors.transparent};
        border: none;
        color: ${VibeCheckColors.darkGrey};
    }
`;