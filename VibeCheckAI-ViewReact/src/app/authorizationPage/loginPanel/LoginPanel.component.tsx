
import {VibeCheckColors} from 'Colors/VibeCheckColors';
import {CustomButton} from 'Components/button/CustomButton.component';
import {IconField} from 'primereact/iconfield';
import {InputIcon} from 'primereact/inputicon';
import {InputText} from 'primereact/inputtext';
import React, {FC, ReactElement} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {setUser} from 'Redux/user/user.slice';
import {translateText} from 'src/lang/TranslationUtils';
import {ApiResponse} from 'Utils/axiosUtils/ApiResponse.type';
import {LoginRequestDTO, LoginResponseDTO} from '../AuthorizationPage.dto';
import {AuthorizationPageService} from '../AuthorizationPage.service';
import {StyledLoginPanel} from './LoginPanel.style';

interface LoginPanelProps {
	userEmail: string;
	setUserEmail: (email: string) => void;
	userPassword: string;
	setUserPassword: (password: string) => void;
	onChangePanelClickHandler: () => void;
}

export const LoginPanel: FC<LoginPanelProps> = (props: LoginPanelProps): ReactElement => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onLoginClickHandler = async () => {
		const loginRequestDTO: LoginRequestDTO = {
			email: props.userEmail,
			password: props.userPassword,
		};

		const apiResponse: ApiResponse<LoginResponseDTO> =
			await AuthorizationPageService.createAuthenticationTokenRest(loginRequestDTO);

			//TODO: Does not navigate to the next page
		if (apiResponse.success) {
			toast.success(translateText("LOGIN_SUCCESS"));
			dispatch(setUser({role: apiResponse.response.subscription, token: apiResponse.response.token}));
			navigate("/socialMediaAnalysis");
		} else {
			toast.error(apiResponse.message);
		}
	};

	return <StyledLoginPanel>
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

		<div className='flex justify-content-between w-full align-items-center'>
			<a className='w-6' onClick={props.onChangePanelClickHandler}>
				{translateText("DONT_HAVE_ACCOUNT")}
			</a>
			<CustomButton 
				className='w-5' 
				onClick={onLoginClickHandler} 
				backgroundColor={VibeCheckColors.diagramPurple}
			>
				{translateText("LOGIN_BUTTON")}
			</CustomButton>
		</div>

	</StyledLoginPanel>
};
