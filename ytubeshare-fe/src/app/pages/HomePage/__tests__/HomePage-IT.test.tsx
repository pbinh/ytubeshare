import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HomePage } from '..';
import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';
import { ServiceProvider } from 'services/DataService';
import { ReduxWrapper } from '../LoginedEnvWrapper'
import { BrowserRouter, Route, Routes } from 'react-router-dom';


test('|Integration Test| => [HomePage] Logined Case - Email: test1@yopmail.com', () => {
    const { getByText } = ReduxWrapper(<HomePage />)

    console.log("Test successfully rendered")
    const titleElement = screen.getByText('Youtube Sharing Website');
    expect(titleElement).toBeInTheDocument();

    console.log('Check Existence of username (email)')
    const username = screen.getByText('test1@yopmail.com');
    expect(username).toBeInTheDocument();

    console.log('Find Share Button & Test on Click => appear modal')
    const shareBtn = screen.getByText('Share');
    fireEvent.click(shareBtn);
    const modalTitle = screen.getByText('Sharing is happiness');
    expect(modalTitle).toBeInTheDocument();
});
