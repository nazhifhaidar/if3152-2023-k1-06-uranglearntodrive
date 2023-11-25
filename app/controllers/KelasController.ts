import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import ResponseData from '@/app/utils/Response'

class KelasController{
    prisma = prisma;
    static async handleKelasManager(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {query} = req.body;
            let classes;
            if (!query){
                classes = await prisma.kelas.findMany({
                    include:{
                        kendaraan:{
                            select:{
                                nama:true
                            }
                        },
                        instruktur:{
                            select:{
                                nama_lengkap:true
                            }
                        }
                    }
                });
            }else{
                classes = await prisma.kelas.findMany({
                    where:{
                        nama: {
                          contains: query  
                        }
                    }
                });
            }
            
            if (!classes || classes.length === 0){
                responseData = new ResponseData("error", "Can't read data", null);
                console.log(responseData);
                return res.status(404).json(responseData);
            }
            else{
                responseData = new ResponseData("success", 'data retreived', classes)
            }
            console.log(responseData);
            return res.status(200).json(responseData);
        }catch(e: any){
            responseData =  new ResponseData("error", e.message, null);
            console.log(responseData);
            return res.status(500).json(responseData);
        }
        
    }
    static async handleCreateKelas(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {nama, harga, total_jam, jumlah_sesi, id_kendaraan, id_instruktur} = req.body;
            if (!nama || !harga || !total_jam || !jumlah_sesi || !id_kendaraan|| !id_instruktur){
                responseData = new ResponseData("error", "Every attribute must be filled", null);
                return res.status(400).json(responseData)
            }
            const newKelas = await prisma.kelas.create({
                data:{
                    nama:nama,
                    harga:parseInt(harga as string, 10),
                    total_jam: parseInt(total_jam as string, 10),
                    jumlah_sesi:parseInt(jumlah_sesi as string, 10),
                    id_kendaraan:parseInt(id_kendaraan as string, 10),
                    id_instruktur:parseInt(id_instruktur as string, 10),
                },
            })
            responseData = new ResponseData('success', 'Instructure created successfully', newKelas);
            return res.status(200).json(responseData);
        }catch(error){
            console.error('Error creating instructure:', error);
            responseData = new ResponseData('error', 'Internal server error', null);
            return res.status(500).json(responseData);
        }
    }

    static async handleHapusKelas(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {id} = req.query;
            const deletedKelas = await prisma.kelas.delete({
                where:{
                    id:parseInt(id as string, 10)
                }
            });
            responseData = new ResponseData('success', 'Kelas deleted successfully', deletedKelas);
            return res.status(200).json(responseData);
        }catch(error){
            console.error('Error deleting kelas:', error);
            responseData = new ResponseData('error', error as string, null);
            return res.status(500).json(responseData);
        }
    }

    static async getKelasbyId(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {id} = req.query;
            let kelas;
            kelas = await prisma.kelas.findUnique({
                include:{
                    kendaraan:{
                        select:{
                            nama: true,
                        }
                    },
                    instruktur:{
                        select:{
                            nama_lengkap: true,
                        }
                    },
                },
                where:{
                    id: parseInt(id as string, 10)
                },
            });
            if (!kelas){
                responseData = new ResponseData("error", "Can't read data", null);
                console.log(responseData);
                return res.status(404).json(responseData);
            }
            else{
                responseData = new ResponseData("success", 'data retreived', kelas)
            }
            console.log(responseData);
            return res.status(200).json(responseData);
        }catch(e: any){
            responseData =  new ResponseData("error", e.message, null);
            console.log(responseData);
            return res.status(500).json(responseData);
        }   
    }

    static async handleUbahKelas(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {id} = req.query;
            const {nama, harga, total_jam, jumlah_sesi, id_kendaraan, id_instruktur} = req.body;
            if (!nama || !harga || !total_jam || !jumlah_sesi || !id_kendaraan|| !id_instruktur){
                responseData = new ResponseData("error", "Every attribute must be filled", null);
                return res.status(400).json(responseData)
            }
            const newkelas = await prisma.kelas.update({
                where:{
                    id:parseInt(id as string, 10),
                },
                data:{
                    nama:nama,
                    harga:parseInt(harga as string, 10),
                    total_jam: parseInt(total_jam as string, 10),
                    jumlah_sesi:parseInt(jumlah_sesi as string, 10),
                    id_kendaraan:parseInt(id_kendaraan as string, 10),
                    id_instruktur:parseInt(id_instruktur as string, 10),
                },
            })
            responseData = new ResponseData('success', 'kelas created successfully', newkelas);
            return res.status(200).json(responseData);
        }catch(error){
            console.error('Error creating kelas:', error);
            responseData = new ResponseData('error', 'Internal server error', null);
            return res.status(500).json(responseData);
        }
    }

    static async getIdKelas(req: NextApiRequest, res: NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {query} = req.body;
            let idkelas;
            if (!query){
                idkelas = await prisma.kelas.findMany({
                    select:{
                        id:true,
                        nama:true,
                    }
                });
            }else{
                idkelas = await prisma.kelas.findMany({
                    where:{
                        nama: {
                          contains: query  
                        }
                    },
                    select:{
                        id:true
                    }
                });
            }
            
            if (!idkelas || idkelas.length === 0){
                responseData = new ResponseData("error", "Can't read data", null);
                console.log(responseData);
                return res.status(404).json(responseData);
            }
            else{
                responseData = new ResponseData("success", 'data retreived', idkelas)
            }
            console.log(responseData);
            return res.status(200).json(responseData);
        }catch(e: any){
            responseData =  new ResponseData("error", e.message, null);
            console.log(responseData);
            return res.status(500).json(responseData);
        }
        
    }

    static async getTipebyId(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {id} = req.query;
            let kelas;
            kelas = await prisma.kelas.findUnique({
                include:{
                    kendaraan:{
                        select:{
                            tipe_kendaraan: true,
                        }
                    }
                },
                where:{
                    id: parseInt(id as string, 10)
                },
            });
            let tipe;
            tipe = kelas?.kendaraan.tipe_kendaraan;
            if (!kelas){
                responseData = new ResponseData("error", "Can't read data", null);
                console.log(responseData);
                return res.status(404).json(responseData);
            }
            else{
                responseData = new ResponseData("success", 'data retreived', tipe)
            }
            console.log(responseData);
            return res.status(200).json(responseData);
        }catch(e: any){
            responseData =  new ResponseData("error", e.message, null);
            console.log(responseData);
            return res.status(500).json(responseData);
        }   
    }
}

export default KelasController;