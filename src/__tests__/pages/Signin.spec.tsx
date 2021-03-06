import React from 'react';
import { render } from '@testing-library/react';
import SignIn from '../../pages/Signin';

jest.mock('react-router-dom', () => {
    return {
        useHistory: jest.fn(),
        Link: ({ children }: { children: React.ReactNode }) => children,
    };
});

describe('SignIn Page', () => {
    it('Should be able to sign in', () => {
        const { getByPlaceholderText } = render(<SignIn />);

        const emailField = getByPlaceholderText('E-mail');
        const passwordField = getByPlaceholderText('Senha');
    });
});