import './App.style.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {AppRouter} from 'App/router/AppRouter';
import {AppContainer} from 'Components/container/AppContainer.component';
import React, {Component, ReactElement, StrictMode} from 'react';
import {Provider} from 'react-redux';
import {RouterProvider} from 'react-router-dom';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from 'Redux/store';

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

