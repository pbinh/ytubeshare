import React from 'react';
import { Provider } from 'react-redux'
import { render } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { configureAppStore } from 'store/configureStore';
import { ServiceProvider } from 'services/DataService';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styles/theme/ThemeProvider';

export const UnloginedEnvWrapper = (children) => {
    const reduxStore = configureAppStore();

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

