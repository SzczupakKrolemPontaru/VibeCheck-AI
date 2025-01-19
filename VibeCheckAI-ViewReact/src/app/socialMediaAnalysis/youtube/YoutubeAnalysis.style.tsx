import {VibeCheckColors} from 'Colors/VibeCheckColors';
import styled from 'styled-components';

export const StyledYoutubeAnalysis = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    margin: auto;
    gap: 1.5rem;
    
    .performance-metrics-box {
        padding: 2rem 0;
        background-color: ${VibeCheckColors.backgroundGrey};
    }
    
    .knob-container {
        .p-card-content {
            display: flex;
            justify-content: center;
        }
    }
`