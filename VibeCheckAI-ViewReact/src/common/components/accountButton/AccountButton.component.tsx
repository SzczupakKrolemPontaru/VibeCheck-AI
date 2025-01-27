import React, {FC, ReactElement} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {RootState} from 'Redux/store';
import {setUser} from 'Redux/user/user.slice';
import {translateText} from 'src/lang/TranslationUtils';
import {StyledSplitButton} from './SplitButton.style';

export const AccountButton: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userEmail = useSelector((state: RootState) => state.user.email);


    const items = [
        { label: 'Favourites', icon: 'pi pi-star', command: () => navigate('/favourites', { replace: true })},
        { label: 'Update Account', icon: 'pi pi-user-edit', command: () => {
            console.log('Option 2 selected')
        }},
        { label: 'Logout', icon: 'pi pi-sign-out', command: () => {
            toast.success(translateText("LOGOUT_SUCCESS"));
            navigate('/login', { replace: true });
            dispatch(setUser({subscriptionLevel: undefined,
                token: '',
                email: ''
            }));
        }}
    ];

    return <StyledSplitButton className='w-fit'
        label={userEmail}
        icon="pi pi-user"
        model={items}
        severity="contrast"
    />;
}