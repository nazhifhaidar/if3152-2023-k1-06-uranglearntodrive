import Provider from "@/app/Provider";
import AdminPage from "@/app/admin/page";
import { MessageProvider } from "@/app/components/Providers/MessageProvider";
import Row from "@/app/components/Row";
import OpenClosedSideBar from "@/app/components/SideBar/OpenClosedSideBar";
import CurrentPageStyle from "@/app/components/Style/current_page_style";
import AdminList from "@/app/owner/manage-admin/AdminList";
import CreateAdminButton from "@/app/owner/manage-admin/CreateAdminButton";
import { waitFor } from "@testing-library/react";
import { render, screen } from '@testing-library/react'
import { getServerSession } from "next-auth";
import Link from "next/link";
import React, { Dispatch } from 'react'

global.fetch = jest.fn();
describe('Manage Admin', () => {
    it('Should be contain list of admin admin list', async () => {
        const mockData = {
            data: [
                { id: 1, username: 'admin1', name: 'Admin One', email: 'admin1@example.com' },
                { id: 2, username: 'admin2', name: 'Admin Two', email: 'admin2@example.com' },
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

        // Mock useState
        const setAdmins = jest.fn();
        const setSelectedAdminId = jest.fn();
        const setConfirmationOpen = jest.fn();
        const setLoading = jest.fn();

        jest.spyOn(React, 'useState')
            .mockImplementationOnce(() => [mockData.data, setAdmins])
            .mockImplementationOnce(() => [1, setSelectedAdminId])
            .mockImplementationOnce(() => [false, setConfirmationOpen])
            .mockImplementationOnce(() => [false, setLoading])

        jest.spyOn(React, 'useEffect').mockImplementation(() => jest.fn());


        render(<MessageProvider>
            <AdminList />
        </MessageProvider>);

        await waitFor(() => {
            const a1reg = "Name: Admin One"
            expect(screen.getByText(a1reg)).toBeInTheDocument();
        }, {timeout: 5000});
        const a2reg = "Username: admin2"
        expect(screen.getByText(a2reg)).toBeInTheDocument();
    }, 10000);

    it('Should be contain \"Buat akun Baru\" Button', async () => {
        // const session = getServerSession();
        const mockData = {
            data: [
                { id: 1, username: 'admin1', name: 'Admin One', email: 'admin1@example.com' },
                { id: 2, username: 'admin2', name: 'Admin Two', email: 'admin2@example.com' },
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