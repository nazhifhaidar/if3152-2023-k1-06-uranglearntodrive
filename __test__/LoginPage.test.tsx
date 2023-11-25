// LoginPage.test.tsx
/// <reference types="@testing-library/jest-dom" />

import {render, screen} from '@testing-library/react'
import LoginPage from '@/app/login/page'
import Provider from '@/app/Provider';
import { MessageProvider } from '@/app/components/Providers/MessageProvider';

jest.mock('next/navigation');

describe('Login', () => {
    it('Harusnya Ada Text yang diperlukan', () => {
        render(<MessageProvider><LoginPage/></MessageProvider>) // ARRANGE
    
        expect(screen.getByText('LOGIN')).toBeInTheDocument();
        expect(screen.getByText('Username')).toBeInTheDocument();
        expect(screen.getByText('Password')).toBeInTheDocument();
    
    })

    it('Harusnya Ada Button', () => {
        render(<MessageProvider><LoginPage/></MessageProvider>) // ARRANGE
    
        expect(screen.getAllByRole('button'));
    
    })
})

