import styled from 'styled-components';
import {VibeCheckColors} from "Colors/VibeCheckColors";

export const StyledYoutubeAnalysis = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    margin: auto;
    gap: 1.5rem;
    
    .performance-metrics-box {
        padding: 2rem;
        background-color: ${VibeCheckColors.white};
    }
    
    .knob-container {
        .p-card-content {
            display: flex;
            justify-content: center;
        }
    }
`