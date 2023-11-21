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
                classes = await prisma.kelas.findMany();
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
                    harga:harga,
                    total_jam: total_jam,
                    jumlah_sesi:jumlah_sesi,
                    id_kendaraan:id_kendaraan,
                    id_instruktur:id_instruktur
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

    static async handleHapusKelas(){

    }
}

export default KelasController;