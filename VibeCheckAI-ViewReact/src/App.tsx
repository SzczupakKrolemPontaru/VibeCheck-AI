import './App.style.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import React, {Component, ReactElement, StrictMode} from 'react';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from 'Redux/store';
import {AppRouter} from 'App/router/AppRouter';
import {GlobalStyle} from './GlobalStyles';

export default class App extends Component {
    render(): ReactElement {
        return <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ToastContainer
                    position="top-left"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    pauseOnFocusLoss
                    theme="light"
                />
                <StrictMode>
                    <GlobalStyle />
                    <AppRouter />
                </StrictMode>
            </PersistGate>
        </Provider>
    }
}

