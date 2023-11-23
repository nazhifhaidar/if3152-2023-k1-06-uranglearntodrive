import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import ResponseData from '@/app/utils/Response'
import bcrypt from 'bcryptjs'
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';

class KendaraanController{
    prisma = prisma;
    static async handleKendaraanManager(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {query} = req.body;
            let kendaraans;
            if (!query){
                kendaraans = await prisma.kendaraan.findMany({
                    // where:{
                    //     status_kendaraan: {
                    //         in: ['Diperbaiki', 'Siap', 'Dipakai']
                    //       }
                    // }
                });
            }else{
                kendaraans = await prisma.kendaraan.findMany({
                    where:{
                        nama: {
                          contains: query  
                        }
                        // status_kendaraan: {
                        //     in: ['Diperbaiki', 'Siap', 'Dipakai']
                        //   } 
                    }
                });
            }
            
            if (!kendaraans || kendaraans.length === 0){
                responseData = new ResponseData("error", "Can't read data", null);
                console.log(responseData);
                return res.status(404).json(responseData);
            }
            else{
                responseData = new ResponseData("success", 'data retreived', kendaraans)
                
            }
            console.log(responseData);
            return res.status(200).json(responseData);
        }catch(e: any){
            responseData =  new ResponseData("error", e.message, null);
            console.log(responseData);
            return res.status(500).json(responseData);
        }
    }
    static async handleCreateKendaraan(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {nama, tipe_kendaraan, status_kendaraan, tanggal_servis} = req.body;
            if (!nama || !tipe_kendaraan || !status_kendaraan || !tanggal_servis ){
                responseData = new ResponseData("error", "Every attribute must be filled", null);
                return res.status(400).json(responseData)
            }
            
            // const existingUser = await prisma.user.findUnique({
            //     where: {
            //       username: username,
            //     },
            //   });
          
            //   if (existingUser) {
            //     responseData = new ResponseData('error', 'Username already exists', null);
            //     return res.status(400).json(responseData);
            //   }
            
            const newKendaraan= await prisma.kendaraan.create({
                data:{
                    nama:nama,
                    tipe_kendaraan: tipe_kendaraan,
                    status_kendaraan: status_kendaraan,
                    tanggal_servis: new Date (tanggal_servis).toISOString(),
                    }
            })
             
            responseData = new ResponseData('success', 'Kendaraan created successfully', newKendaraan);
            return res.status(200).json(responseData);
        }catch(error){
            console.error('Error creating kendaraan:', error);
            responseData = new ResponseData('error', 'Internal server error', null);
            return res.status(500).json(responseData);
        }
    }

    static async handleDeleteKendaraan(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {id} = req.query;
            const deletedUser = await prisma.kendaraan.delete({
                where:{
                    id:parseInt(id as string, 10)
                }
            });
            responseData = new ResponseData('success', 'Kendaraan deleted successfully', deletedUser);
            return res.status(200).json(responseData);
        }catch(error){
            console.error('Error deleting kendaraan:', error);
            responseData = new ResponseData('error', error as string, null);
            return res.status(500).json(responseData);
        }
    }
    // static async getKendaraanbyId(req: NextApiRequest, res:NextApiResponse){
    //     let responseData: ResponseData<any>;
    //     try{
    //         const {id} = req.query;
    //         let kendaraans;
    //         kendaraans = await prisma.kendaraan.findUnique({
    //             where:{
    //                 id: parseInt(id as string, 10)
    //             }
    //         });
    //         if (!kendaraans){
    //             responseData = new ResponseData("error", "Can't read data", null);
    //             console.log(responseData);
    //             return res.status(404).json(responseData);
    //         }
    //         else{
    //             responseData = new ResponseData("success", 'data retreived', kendaraans)
    //         }
    //         console.log(responseData);
    //         return res.status(200).json(responseData);
    //     }catch(e: any){
    //         responseData =  new ResponseData("error", e.message, null);
    //         console.log(responseData);
    //         return res.status(500).json(responseData);
    //     }   
    // }

    static async getKendaraanbyId(req: NextApiRequest, res: NextApiResponse) {
        let responseData: ResponseData<any>;
        try {
            const { id } = req.query;
            let kendaraan;
    
            kendaraan = await prisma.kendaraan.findUnique({
                where: {
                    id: parseInt(id as string, 10)
                }
            });
    
            if (!kendaraan) {
                responseData = new ResponseData("error", "Can't read data", null);
                console.log(responseData);
                return res.status(404).json(responseData);
            } else {
                const formattedData = {
                    nama: kendaraan.nama,
                    tipe_kendaraan: kendaraan.tipe_kendaraan,
                    status_kendaraan: kendaraan.status_kendaraan,
                    tanggal_servis: kendaraan.tanggal_servis ? new Date(kendaraan.tanggal_servis).toISOString().substring(0, 10) : null,
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
    

    // static async getIdKendaraan(req: NextApiRequest, res: NextApiResponse){
    //     let responseData: ResponseData<any>;
    //     try{
    //         const {query} = req.body;
    //         let idKendaraan;
    //         if (!query){
    //             idKendaraan = await prisma.kendaraan.findMany({
    //                 select:{
    //                     id:true,
    //                 }
    //             });
    //         }else{
    //             idKendaraan = await prisma.kendaraan.findMany({
    //                 where:{
    //                     nama: {
    //                       contains: query  
    //                     }
    //                 },
    //                 select:{
    //                     id:true
    //                 }
    //             });
    //         }
            
    //         if (!idKendaraan || idKendaraan.length === 0){
    //             responseData = new ResponseData("error", "Can't read data", null);
    //             console.log(responseData);
    //             return res.status(404).json(responseData);
    //         }
    //         else{
    //             responseData = new ResponseData("success", 'data retreived', idKendaraan)
    //         }
    //         console.log(responseData);
    //         return res.status(200).json(responseData);
    //     }catch(e: any){
    //         responseData =  new ResponseData("error", e.message, null);
    //         console.log(responseData);
    //         return res.status(500).json(responseData);
    //     }
         
    // }
    static async handleUbahKendaraan(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {id} = req.query;
            const {nama, tipe_kendaraan, status_kendaraan, tanggal_servis} = req.body;
            if (!nama || !tipe_kendaraan || !status_kendaraan || !tanggal_servis ){
                responseData = new ResponseData("error", "Every attribute must be filled", null);
                return res.status(400).json(responseData)
            }
            const newKendaraan = await prisma.kendaraan.update({
                where:{
                    id:parseInt(id as string, 10),
                },
                data:{
                    nama:nama,
                    tipe_kendaraan:tipe_kendaraan,
                    status_kendaraan:status_kendaraan,
                    tanggal_servis:new Date (tanggal_servis).toISOString(),
                },
            })
            responseData = new ResponseData('success', 'Kendaraan created successfully', newKendaraan);
            return res.status(200).json(responseData);
        }catch(error){
            console.error('Error creating kendaraan:', error);
            responseData = new ResponseData('error', 'Internal server error', null);
            return res.status(500).json(responseData);
        }
    }
}
export default KendaraanController;
