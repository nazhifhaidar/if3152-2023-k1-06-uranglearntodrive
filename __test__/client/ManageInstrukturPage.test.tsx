import Provider from "@/app/Provider";
import AdminPage from "@/app/admin/page";
import { MessageProvider } from "@/app/components/Providers/MessageProvider";
import Row from "@/app/components/Row";
import OpenClosedSideBar from "@/app/components/SideBar/OpenClosedSideBar";
import CurrentPageStyle from "@/app/components/Style/current_page_style";
import InstrukturList from "@/app/owner/manage-instruktur/InstrukturList";
import CreateAdminButton from "@/app/owner/manage-admin/CreateAdminButton";
import { waitFor } from "@testing-library/react";
import { render, screen } from '@testing-library/react'
import { getServerSession } from "next-auth";
import Link from "next/link";
import React, { Dispatch } from 'react'

global.fetch = jest.fn();
describe('Manage Instruktur', () => {
    it('Should be contain list of Instruktur list', async () => {
        const mockData = {
            data: [
                { id: 1, nama_lengkap: 'Hugo Tanidi', nik: '3425364726352637', alamat: 'Amazon Street A 16, New Zealand', no_telp: '087656756876' },
                { id: 2, nama_lengkap: 'Rahmat Wibowo', nik: '5647364536473847', alamat: 'Amazon Street A 16, New Zealand', no_telp: '086547385647'},
                // Add more mock data as needed
            ],
            message: 'data retrieved',
            status: 'sucess'
        };

        // Mock the fetch implementation
        const mockFetchPromise = Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockData),
        } as Response);

        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        //Mock useState
        const setInstrukturs = jest.fn();
        const setSelectedInstrukturId = jest.fn();
        const setConfirmationOpen = jest.fn();
        const setLoading = jest.fn();

        jest.spyOn(React, 'useState')
            .mockImplementationOnce(() => [mockData.data, setInstrukturs])
            .mockImplementationOnce(() => [1, setSelectedInstrukturId])
            .mockImplementationOnce(() => [false, setConfirmationOpen])
            .mockImplementationOnce(() => [false, setLoading])

        jest.spyOn(React, 'useEffect').mockImplementation(() => jest.fn());


        render(<MessageProvider>
            <InstrukturList />
        </MessageProvider>);

        await waitFor(() => {
            const i1reg = "nama_lengkap: Hugo Tanidi"
            expect(screen.getByText(i1reg)).toBeInTheDocument();
        }, {timeout: 5000});
        const i2reg = "nama_lengkap: Rahmat Wibowo"
        expect(screen.getByText(i2reg)).toBeInTheDocument();
    }, 10000);

    it('Should be contain \"Buat Instruktur Baru\" Button', async () => {
        // const session = getServerSession();
        const mockData = {
            data: [
                { id: 1, nama_lengkap: 'Hugo Tanidi', nik: '3425364726352637', alamat: 'Amazon Street A 16, New Zealand', no_telp: '087656756876' },
                { id: 2, nama_lengkap: 'Rahmat Wibowo', nik: '5647364536473847', alamat: 'Amazon Street A 16, New Zealand', no_telp: '086547385647'},
            ],
            message: 'data retrieved',
            status: 'sucess'
        };

        // Mock the fetch implementation
        const mockFetchPromise = Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockData),
        } as Response);

        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        render(<CreateAdminButton />);

        expect(screen.getByText("Buat Akun Baru")).toBeInTheDocument();
    })
})