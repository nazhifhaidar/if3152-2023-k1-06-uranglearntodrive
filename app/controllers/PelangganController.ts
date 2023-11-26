import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import ResponseData from '@/app/utils/Response'
import { useSearchParams } from 'next/navigation';

class PelangganController{
    prisma = prisma;
    static async handlePelangganManager(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            let customer;
            const {query} = req.body;
            if (!query){
                customer = await prisma.pelanggan.findMany({
                    include:{
                        pilihan_kelas:true,
                    }
                });
            }else{
                customer = await prisma.pelanggan.findMany({
                    where:{
                        nama_lengkap: {
                        contains: query  
                        }
                    }
                });
            }
            
            if (!customer || customer.length === 0){
                responseData = new ResponseData("error", "Can't read data", null);
                console.log(responseData);
                return res.status(404).json(responseData);
            }
            else{
                responseData = new ResponseData("success", 'data retreived', customer)
            }
            console.log(responseData);
            return res.status(200).json(responseData);
        }catch(e: any){
            responseData =  new ResponseData("error", e.message, null);
            console.log(responseData);
            return res.status(500).json(responseData);
        }
    }
    static async addDataPelanggan(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            let cust;
            const {nama_lengkap, umur, no_telp, alamat, id, tipe_kendaraan} = req.body;
            cust = await prisma.pelanggan.create({
                    data:{
                        nama_lengkap:nama_lengkap,
                        umur:umur,
                        no_telp:no_telp,
                        alamat:alamat,
                        id_kelas:id,
                        tipe_kendaraan:tipe_kendaraan
                    }
                }
            );
            if (!cust){
                responseData = new ResponseData("error", "Conflicting data", null);
                console.log(responseData);
                return res.status(409).json(responseData);
            }
            else{
                responseData = new ResponseData("success", 'data retreived', cust)
            }
            console.log(responseData);
            return res.status(200).json(responseData);
        }catch(e: any){
            responseData =  new ResponseData("error", e.message, null);
            console.log(responseData);
            return res.status(500).json(responseData);
        }
    }

    static async handleDeletePelanggan(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {id} = req.query;
            const deletedUser = await prisma.pelanggan.delete({
                where:{
                    id:parseInt(id as string, 10)
                }
            });
            responseData = new ResponseData('success', 'Pelanggan deleted successfully', deletedUser);
            return res.status(200).json(responseData);
        }catch(error){
            console.error('Error deleting pelanggan:', error);
            responseData = new ResponseData('error', error as string, null);
            return res.status(500).json(responseData);
        }
    }

    static async getPelangganbyId(req: NextApiRequest, res: NextApiResponse) {
        let responseData: ResponseData<any>;
        try {
            const { id } = req.query;
            let pelanggan;
    
            pelanggan = await prisma.pelanggan.findUnique({
                where: {
                    id: parseInt(id as string, 10)
                }
            });
    
            if (!pelanggan) {
                responseData = new ResponseData("error", "Can't read data", null);
                console.log(responseData);
                return res.status(404).json(responseData);
            } else {
                const formattedData = {
                    nama_lengkap: pelanggan.nama_lengkap,
                    id_kelas: pelanggan.id_kelas,
                    umur: pelanggan.umur,
                    no_telp: pelanggan.no_telp,
                    status:pelanggan.status,
                    alamat:pelanggan.alamat,
                };
    
                responseData = new ResponseData("success", 'data retrieved', formattedData);
            }
    
            console.log(responseData);
            return res.status(200).json(responseData);
        } catch (e: any) {
            responseData = new ResponseData("error", e.message, null);
            console.log(responseData);
            return res.status(500).json(responseData);
        }
    }

    static async handleUbahPelanggan(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {id} = req.query;
            const {nama_lengkap, id_kelas, umur, no_telp, alamat, status} = req.body;
            if (!nama_lengkap || !id_kelas || !umur || !no_telp || !alamat || !status ){
                responseData = new ResponseData("error", "Every attribute must be filled", null);
                return res.status(400).json(responseData)
            }
            const newPelanggan = await prisma.pelanggan.update({
                where:{
                    id:parseInt(id as string, 10),
                },
                data:{
                    nama_lengkap: nama_lengkap,
                    id_kelas: id_kelas,
                    umur:umur,
                    no_telp: no_telp,
                    alamat: alamat,
                    status: status,
                },
            })
            responseData = new ResponseData('success', 'Pelanggan created successfully', newPelanggan);
            return res.status(200).json(responseData);
        }catch(error){
            console.error('Error creating pelanggan:', error);
            responseData = new ResponseData('error', 'Internal server error', null);
            return res.status(500).json(responseData);
        }
    }

}

export default PelangganController;