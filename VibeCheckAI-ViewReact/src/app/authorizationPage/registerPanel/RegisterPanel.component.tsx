
import {VibeCheckColors} from 'Colors/VibeCheckColors';
import {CustomButton} from 'Components/button/CustomButton.component';
import {IconField} from 'primereact/iconfield';
import {InputIcon} from 'primereact/inputicon';
import {InputText} from 'primereact/inputtext';
import React, {FC, ReactElement, useState} from 'react';
import {toast} from 'react-toastify';
import {translateText} from 'src/lang/TranslationUtils';
import {ApiResponse} from 'Utils/axiosUtils/ApiResponse.type';
import {RegisterNewUserDTO} from '../AuthorizationPage.dto';
import {AuthorizationPageService} from '../AuthorizationPage.service';
import {StyledRegisterPanel} from './RegisterPanel.style';

interface RegisterPanelProps {
	userEmail: string;
	setUserEmail: (email: string) => void;
	userPassword: string;
	setUserPassword: (password: string) => void;
	onChangePanelClickHandler: () => void;
}

export const RegisterPanel: FC<RegisterPanelProps> = (props: RegisterPanelProps): ReactElement => {
	const [repeatedPassword, setRepeatedPassword] = useState<string>("");

	const validateIdenticalPasswords = (password: string, confirmPassword: string): boolean => {
		return password === confirmPassword && password.length > 0;
	}

	const onRegisterClickHandler = async () => {

		const userDTO: RegisterNewUserDTO = {
			email: props.userEmail,
			password: props.userPassword,
		};

		if (!validateIdenticalPasswords(props.userPassword, repeatedPassword)) {
			toast.error(translateText("PASSWORDS_NOT_MATCHING"));
			return;
		}

		const response: ApiResponse<any> = await AuthorizationPageService.registerUserRest(userDTO);
		console.log(response)
		if (response.success) {
			toast.success(translateText("REGISTER_SUCCESS"));
			props.onChangePanelClickHandler();
		} else {
			toast.error(response.message);
		}
	};

	return <StyledRegisterPanel>
		<IconField className="flex align-items-center w-full">
			<InputIcon className="pi pi-user flex align-items-center justify-content-center"/>
			<InputText 
				type='email'
				className='w-full'
				value={props.userEmail}
				onChange={(e) => props.setUserEmail(e.target.value)}
				placeholder={translateText("ENTER_EMAIL")}
			/>
		</IconField>
		<IconField className="flex align-items-center w-full">
			<InputIcon className="pi pi-lock flex align-items-center justify-content-center"/>
			<InputText 
				type='password'
				className='w-full'
				value={props.userPassword}
				onChange={(e) => props.setUserPassword(e.target.value)}
				placeholder={translateText("ENTER_PASSWORD")}
			/>
		</IconField>
		<IconField className="flex align-items-center w-full">
			<InputIcon className="pi pi-lock flex align-items-center justify-content-center"/>
			<InputText 
				type='password'
				className='w-full'
				value={repeatedPassword}
				onChange={(e) => setRepeatedPassword(e.target.value)}
				placeholder={translateText("REPEAT_PASSWORD")}
			/>
		</IconField>

		<div className='flex justify-content-between w-full align-items-center'>
			<a className='w-6' onClick={props.onChangePanelClickHandler}>
				{translateText("ALREADY_HAVE_ACCOUNT")}
			</a>
			<CustomButton 
				className='w-5' 
				onClick={onRegisterClickHandler} 
				backgroundcolor={VibeCheckColors.diagramPurple}
			>
				{translateText("REGISTER_BUTTON")}
			</CustomButton>
		</div>
		
	</StyledRegisterPanel>
};
