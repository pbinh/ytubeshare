import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { RegisterPage } from '..';
import { UnloginedEnvWrapper } from '../UnloginedEnvWrapper';


test('|Integration Test| => [Register Page] Register flow', async () => {
    const { getByText } = UnloginedEnvWrapper(<RegisterPage />)

    console.log('Test successfully rendered')
    const titleElement = screen.getByText('Thank you for Registration');
    expect(titleElement).toBeInTheDocument();

    console.log('Check register Button')
    const registerButton = screen.getByText('Register');
    expect(registerButton).toBeInTheDocument();

    console.log('Check case: no fill text but still press register')
    await waitFor(() => {
        fireEvent.click(registerButton);
        const minLengthRequiredText = screen.getByText('Password must be minimum 6 characters');
        expect(minLengthRequiredText).toBeInTheDocument();
    });
});
