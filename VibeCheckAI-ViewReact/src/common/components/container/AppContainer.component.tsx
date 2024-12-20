import React, {PropsWithChildren} from "react";
import {FC, ReactElement} from "react";

interface AppContainerProps {}

export const AppContainer: FC<React.PropsWithChildren<PropsWithChildren<AppContainerProps>>> = (props: PropsWithChildren<AppContainerProps>): ReactElement => {
    return <>
        {props.children}
    </>
}