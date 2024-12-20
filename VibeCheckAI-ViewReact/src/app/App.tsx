import React from "react";
import {Component, ReactElement, StrictMode} from "react";
import {RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux';
import {AppContainer} from "Components/container/AppContainer.component";
import {AppRouter} from "App/router/AppRouter";
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from "Redux/store";
import './App.style.css';

export default class App extends Component {
    render(): ReactElement {
        return <StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                <AppContainer>
                    <RouterProvider router={AppRouter}/>
                </AppContainer>
                </PersistGate>
            </Provider>
        </StrictMode>
    }
}

