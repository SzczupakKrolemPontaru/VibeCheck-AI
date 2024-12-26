import styled from "styled-components";
import {calcRemToPx} from "Utils/VibeCheck.utils";
import {VibeCheckColors} from "Colors/VibeCheckColors";

interface StyledCommentProps {
    commentDepth: number;
}

export const StyledComment = styled.div<StyledCommentProps>`
    width: 100%;
    padding-left: ${props => `${props.commentDepth * calcRemToPx(1)}px`};
    word-wrap: break-word;

    .comment-header {
        display: flex;
        align-items: center;
        gap: ${calcRemToPx(0.5)}px; 
        
        em {
            font-size: 0.7rem;
        }
    }

    .comment-author {
        font-weight: bold;
    }

    .see-replies-button {
        font-size: 0.75rem;
        margin-bottom: 0.25rem;
        color: ${VibeCheckColors.diagramPurple};
        background: none;
        border: none;
        cursor: pointer;
    }
`;