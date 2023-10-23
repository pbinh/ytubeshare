import React from 'react';
import { Provider } from 'react-redux'
import { render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { configureAppStore } from 'store/configureStore';
import { ServiceProvider } from 'services/DataService';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styles/theme/ThemeProvider';

export const ReduxWrapper = (children) => {
    const reduxStore = configureAppStore();
    const authToken = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyfQ.1LOvGy6YD17jhvxhcG4vlPi26rN96fdYS8XZXObFPuk'
    const email = 'test1@yopmail.com'

    ServiceProvider.AuthenService.addInterceptor(authToken)
    ServiceProvider.LocalStorageService.persistUserData({
        email: email,
        auth_token: authToken,
    })

    return {
        ...render(
            <Provider store={reduxStore} >
                <ThemeProvider>
                    <HelmetProvider>
                        <React.StrictMode>
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/" element={children} />
                                </Routes>
                            </BrowserRouter>
                        </React.StrictMode>
                    </HelmetProvider>
                </ThemeProvider>
            </Provider>
        )
    }
}

