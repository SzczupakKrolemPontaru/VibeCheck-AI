import {
YouTubeAnalysisResponseDTO
} from 'App/socialMediaAnalysis/youtube/service/YouTubeAnalysisResponse.dto';
import {CustomButton} from 'Components/button/CustomButton.component';
import {IconField} from 'primereact/iconfield';
import {InputIcon} from 'primereact/inputicon';
import {InputText} from 'primereact/inputtext';
import React, {FC, ReactElement} from 'react';
import {EMPTY_STRING} from 'src/common/utils/VibeCheck.utils';
import {translateText} from 'src/lang/TranslationUtils';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {StyledLinkInput} from './LinkInput.style';

interface LinkInputProps {
    header: string;
    linkValue: string;
    setLinkValue: (event: any) => void;
    onClick: () => void;
    placeholder?: string;
    icon?: IconProp;
}

export const LinkInput: FC<LinkInputProps> = (props: LinkInputProps): ReactElement => {
    return <StyledLinkInput>
        <div className='flex gap-2 h-full'>
            <IconField className='w-9' iconPosition="left">
                <InputIcon className="pi pi-link"> </InputIcon>
                <InputText 
                    className='border-round-md w-full h-full' 
                    value={props.linkValue} 
                    onChange={(e) => props.setLinkValue(e.target.value)}
                    placeholder={props.placeholder ?? EMPTY_STRING} />
            </IconField>
            <CustomButton className='w-3' onClick={props.onClick}>
                {translateText("ANALYZE")}
            </CustomButton>
        </div>
    </StyledLinkInput>
}