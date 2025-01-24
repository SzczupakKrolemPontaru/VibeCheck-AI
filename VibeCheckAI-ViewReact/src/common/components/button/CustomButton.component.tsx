import {ButtonHTMLAttributes, FC} from 'react';
import styled from 'styled-components';
import {VibeCheckColors} from '../../colors/VibeCheckColors';

export interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    secondary?: boolean;
    backgroundColor?: string;
}

export const CustomButton: FC<CustomButtonProps> = styled.button<CustomButtonProps>`
    display: flex;
    gap: 0.5rem;
    width: 100%;
    padding: 0.5rem;
    background-color: ${({ secondary, backgroundColor }) => secondary ? VibeCheckColors.white : backgroundColor ? backgroundColor : VibeCheckColors.diagramPurple};
    color: ${({ secondary }) => secondary ? VibeCheckColors.darkGrey : VibeCheckColors.white};
    border: ${({ secondary }) => secondary ? (`0.0625rem solid ${VibeCheckColors.darkGrey}`) : "none"};
    border-radius: 0.35rem;
    font-size: 1rem;
    overflow: hidden;
    transition: background-color 0.3s, color 0.3s;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    
    &:disabled {
        background-color: ${VibeCheckColors.disabled};
        color: ${VibeCheckColors.fontGrey};
        border-color: ${VibeCheckColors.darkGrey};
    }
`