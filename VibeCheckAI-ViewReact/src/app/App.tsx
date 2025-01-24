import './App.style.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {AppContainer} from 'Components/container/AppContainer.component';
import React, {Component, ReactElement} from 'react';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from 'Redux/store';
import {AppRouter} from './router/AppRouter';

export default class App extends Component {
    render(): ReactElement {
        return <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AppContainer>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        pauseOnFocusLoss
                        theme="light"
                    />
                    <AppRouter/>
                </AppContainer>
            </PersistGate>
        </Provider>
    }
}

