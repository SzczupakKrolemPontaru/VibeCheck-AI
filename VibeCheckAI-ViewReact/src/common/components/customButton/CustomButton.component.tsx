import {ButtonHTMLAttributes, FC} from "react";
import styled from "styled-components";
import {VibeCheckColors} from "../../colors/VibeCheckColors";

export interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export const CustomButton: FC<CustomButtonProps> = styled.button`
    width: 100%;
    padding: 0.25rem;
    background-color: ${VibeCheckColors.black};
    color: ${VibeCheckColors.white};
    border: none;
    border-radius: 0.5rem;
    overflow: hidden;
    
    &:disabled {
        background-color: ${VibeCheckColors.disabled};
    }
`