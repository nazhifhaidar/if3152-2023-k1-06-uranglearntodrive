import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import ResponseData from '@/app/utils/Response'

class JadwalController{
    prisma = prisma;
    static async handleJadwalManager(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {query} = req.body;
            let jadwals;
            if (!query){
                jadwals = await prisma.jadwal.findMany({
                    include:{
                        kelas:true,
                        pelanggan:true,
                        kendaraan:true,
                        instruktur:true
                    }
                });
            }else{
                jadwals = await prisma.jadwal.findMany({
                });
            }
            
            if (!jadwals || jadwals.length === 0){
                responseData = new ResponseData("error", "Can't read data", null);
                console.log(responseData);
                return res.status(404).json(responseData);
            }
            else{
                responseData = new ResponseData("success", 'data retreived', jadwals)
            }
            console.log(responseData);
            return res.status(200).json(responseData);
        }catch(e: any){
            responseData =  new ResponseData("error", e.message, null);
            console.log(responseData);
            return res.status(500).json(responseData);
        }
        
    }
    static async handleMembuatJadwal(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {tanggal, start_sesi, end_sesi, id_kelas, id_pelanggan, id_instruktur, id_kendaraan} = req.body;
            if (!tanggal || !start_sesi || !end_sesi || !id_kelas || !id_pelanggan || !id_instruktur || !id_kendaraan ){
                responseData = new ResponseData("error", "Every attribute must be filled", null);
                return res.status(400).json(responseData)
            }
            const newjadwal = await prisma.jadwal.create({
                data:{
                    tanggal:new Date(`${tanggal}T07:00:00`),
                    start_sesi:new Date(`2000-01-01T${(parseInt(start_sesi as string,10)+7).toString()}:00:00`),
                    end_sesi:new Date(`2000-01-01T${(parseInt(end_sesi as string,10)+7).toString()}:00:00`),
                    id_kelas:parseInt(id_kelas as string,10),
                    id_pelanggan:parseInt(id_pelanggan as string,10),
                    id_instruktur:parseInt(id_instruktur as string,10),
                    id_kendaraan:parseInt(id_kendaraan as string,10),
                },
            })
            responseData = new ResponseData('success', 'jadwal created successfully', newjadwal);
            return res.status(200).json(responseData);
        }catch(error){
            console.error('Error creating jadwal:', error);
            responseData = new ResponseData('error', 'Internal server error', null);
            return res.status(500).json(responseData);
        }
    }

    static async getJadwalbyId(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {id} = req.query;
            let jadwals;
            jadwals = await prisma.jadwal.findUnique({
                include:{
                    kendaraan:true,
                    kelas:true,
                    pelanggan:true
                },
                where:{
                    id: parseInt(id as string, 10)
                }});
            if (!jadwals){
                responseData = new ResponseData("error", "Can't read data", null);
                console.log(responseData);
                return res.status(404).json(responseData);
            }
            else{
                responseData = new ResponseData("success", 'data retreived', jadwals)
            }
            console.log(responseData);
            return res.status(200).json(responseData);
        }catch(e: any){
            responseData =  new ResponseData("error", e.message, null);
            console.log(responseData);
            return res.status(500).json(responseData);
        }   
    }

    static async handleUbahJadwal(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {id} = req.query;
            const {tanggal, start_sesi, end_sesi, id_kelas, id_pelanggan, id_instruktur, id_kendaraan} = req.body;
            if (!tanggal || !start_sesi || !end_sesi || !id_kelas || !id_pelanggan || !id_instruktur || !id_kendaraan ){
                responseData = new ResponseData("error", "Every attribute must be filled", null);
                return res.status(400).json(responseData)
            }
            const newjadwal = await prisma.jadwal.update({
                where:{
                    id:parseInt(id as string, 10),
                },
                data:{
                    tanggal:new Date(`${tanggal}T07:00:00`),
                    start_sesi:new Date(`2000-01-01T${(parseInt(start_sesi as string,10)+7).toString()}:00:00`),
                    end_sesi:new Date(`2000-01-01T${(parseInt(end_sesi as string,10)+7).toString()}:00:00`),
                    id_kelas:parseInt(id_kelas as string,10),
                    id_pelanggan:parseInt(id_pelanggan as string,10),
                    id_instruktur:parseInt(id_instruktur as string,10),
                    id_kendaraan:parseInt(id_kendaraan as string,10),
                },
            })
            responseData = new ResponseData('success', 'jadwal updated successfully', newjadwal);
            return res.status(200).json(responseData);
        }catch(error){
            console.error('Error creating jadwal:', error);
            responseData = new ResponseData('error', 'Internal server error', null);
            return res.status(500).json(responseData);
        }
    }

    static async handleHapusJadwal(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {id} = req.query;
            const deletedUser = await prisma.jadwal.delete({
                where:{
                    id:parseInt(id as string, 10)
                }
            });
            responseData = new ResponseData('success', 'jadwal deleted successfully', deletedUser);
            return res.status(200).json(responseData);
        }catch(error){
            console.error('Error deleting jadwal:', error);
            responseData = new ResponseData('error', error as string, null);
            return res.status(500).json(responseData);
        }
    }

    // static async getIdJadwal(req: NextApiRequest, res: NextApiResponse){
    //     let responseData: ResponseData<any>;
    //     try{
    //         const {query} = req.body;
    //         let idjadwal;
    //         if (!query){
    //             idjadwal = await prisma.jadwal.findMany({
    //                 select:{
    //                     id:true,
    //                     nama_lengkap:true,
    //                 }
    //             });
    //         }else{
    //             idjadwal = await prisma.jadwal.findMany({
    //                 where:{
    //                     nama_lengkap: {
    //                       contains: query  
    //                     }
    //                 },
    //                 select:{
    //                     id:true
    //                 }
    //             });
    //         }
            
    //         if (!idjadwal || idjadwal.length === 0){
    //             responseData = new ResponseData("error", "Can't read data", null);
    //             console.log(responseData);
    //             return res.status(404).json(responseData);
    //         }
    //         else{
    //             responseData = new ResponseData("success", 'data retreived', idjadwal)
    //         }
    //         console.log(responseData);
    //         return res.status(200).json(responseData);
    //     }catch(e: any){
    //         responseData =  new ResponseData("error", e.message, null);
    //         console.log(responseData);
    //         return res.status(500).json(responseData);
    //     }
         
    // }
}

export default JadwalController;