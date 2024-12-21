import React, {FC, PropsWithChildren, ReactElement} from 'react';
import {StyledAppContainer} from './AppContainer.style';

interface AppContainerProps {}

export const AppContainer: FC<React.PropsWithChildren<PropsWithChildren<AppContainerProps>>> 
= (props: PropsWithChildren<AppContainerProps>): ReactElement => {
    return <StyledAppContainer>
        {props.children}
    </StyledAppContainer>
}