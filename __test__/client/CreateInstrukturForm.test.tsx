// CreateInstrukturForm.test.tsx
/// <reference types="@testing-library/jest-dom" />

import {render, screen, fireEvent} from '@testing-library/react'
import CreateInstrukturForm from '@/app/owner/manage-instruktur/create-instruktur/createInstrukturForm';
import InstrukturList from '@/app/owner/manage-instruktur/InstrukturList';
import Provider from '@/app/Provider';
import { MessageProvider } from '@/app/components/Providers/MessageProvider';
import user from '@testing-library/user-event'

jest.mock('next/navigation');

describe('Createinstruktur', () => {
    it('Harusnya Ada Text yang diperlukan', () => {
        render(<MessageProvider><CreateInstrukturForm/></MessageProvider>) // ARRANGE
    
        expect(screen.getByText('NamaLengkap')).toBeInTheDocument();
        expect(screen.getByText('NIK')).toBeInTheDocument();
        expect(screen.getByText('Alamat')).toBeInTheDocument();
        expect(screen.getByText('NomorTelp')).toBeInTheDocument();
    })

    it('Harusnya Ada Button', () => {
        render(<MessageProvider><CreateInstrukturForm/></MessageProvider>) // ARRANGE
    
        expect(screen.getAllByRole('button'));
    
    })

    it('Coba isi create instruktur form', () => {
        render(<MessageProvider><CreateInstrukturForm /></MessageProvider>) // ARRANGE
        const namaLengkapInput = screen.getByLabelText(/NamaLengkap/i) as HTMLInputElement;
        const nikInput = screen.getByLabelText(/NIK/i) as HTMLInputElement;
        const alamatInput = screen.getByLabelText(/Alamat/i) as HTMLInputElement;
        const nomorTelpInput = screen.getByLabelText(/NomorTelp/i)as HTMLInputElement;
        fireEvent.change(namaLengkapInput, { target: { value: 'Prabowo Gibeh' } });
        fireEvent.change(nikInput, {target: {value: '123456789'}})
        fireEvent.change(alamatInput, {target: {value: 'Istana Badut'}})
        fireEvent.change(nomorTelpInput,{target:{value: '087656375827'}} )
        // const form = screen.getByRole('form');
        // fireEvent.submit(form);
        expect(namaLengkapInput.value).toBe('Prabowo Gibeh');
        expect(nikInput.value).toBe('123456789');
        expect(alamatInput.value).toBe('Istana Badut');
        expect(nomorTelpInput.value).toBe('087656375827');
    })
})