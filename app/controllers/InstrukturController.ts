import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import ResponseData from '@/app/utils/Response'
import bcrypt from 'bcryptjs'

class InstrukturController{
    prisma = prisma;
    static async handleInstrukturManager(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {query} = req.body;
            let instrukturs;
            if (!query){
                instrukturs = await prisma.instruktur.findMany({
                });
            }else{
                instrukturs = await prisma.instruktur.findMany({
                    where:{
                        nama_lengkap: {
                          contains: query  
                        }
                    }
                });
            }
            
            if (!instrukturs || instrukturs.length === 0){
                responseData = new ResponseData("error", "Can't read data", null);
                console.log(responseData);
                return res.status(404).json(responseData);
            }
            else{
                responseData = new ResponseData("success", 'data retreived', instrukturs)
            }
            console.log(responseData);
            return res.status(200).json(responseData);
        }catch(e: any){
            responseData =  new ResponseData("error", e.message, null);
            console.log(responseData);
            return res.status(500).json(responseData);
        }
        
    }
    static async handleMembuatInstruktur(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {nama_lengkap, nik, alamat, no_telp} = req.body;
            if (!nama_lengkap || !nik || !alamat || !no_telp ){
                responseData = new ResponseData("error", "Every attribute must be filled", null);
                return res.status(400).json(responseData)
            }
            const newInstruktur = await prisma.instruktur.create({
                data:{
                    nama_lengkap:nama_lengkap,
                    nik:nik,
                    alamat:alamat,
                    no_telp:no_telp,
                },
            })
            responseData = new ResponseData('success', 'Instruktur created successfully', newInstruktur);
            return res.status(200).json(responseData);
        }catch(error){
            console.error('Error creating instruktur:', error);
            responseData = new ResponseData('error', 'Internal server error', null);
            return res.status(500).json(responseData);
        }
    }

    static async getInstrukturbyId(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {id} = req.query;
            let instrukturs;
            instrukturs = await prisma.instruktur.findUnique({
                where:{
                    id: parseInt(id as string, 10)
                }});
            if (!instrukturs){
                responseData = new ResponseData("error", "Can't read data", null);
                console.log(responseData);
                return res.status(404).json(responseData);
            }
            else{
                responseData = new ResponseData("success", 'data retreived', instrukturs)
            }
            console.log(responseData);
            return res.status(200).json(responseData);
        }catch(e: any){
            responseData =  new ResponseData("error", e.message, null);
            console.log(responseData);
            return res.status(500).json(responseData);
        }   
    }

    static async handleUbahInstruktur(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {id} = req.query;
            const {nama_lengkap, nik, alamat, no_telp} = req.body;
            if (!nama_lengkap || !nik || !alamat || !no_telp ){
                responseData = new ResponseData("error", "Every attribute must be filled", null);
                return res.status(400).json(responseData)
            }
            const newInstruktur = await prisma.instruktur.update({
                where:{
                    id:parseInt(id as string, 10),
                },
                data:{
                    nama_lengkap:nama_lengkap,
                    nik:nik,
                    alamat:alamat,
                    no_telp:no_telp,
                },
            })
            responseData = new ResponseData('success', 'Instruktur created successfully', newInstruktur);
            return res.status(200).json(responseData);
        }catch(error){
            console.error('Error creating instruktur:', error);
            responseData = new ResponseData('error', 'Internal server error', null);
            return res.status(500).json(responseData);
        }
    }

    static async handleHapusInstruktur(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {id} = req.query;
            const deletedUser = await prisma.instruktur.delete({
                where:{
                    id:parseInt(id as string, 10)
                }
            });
            responseData = new ResponseData('success', 'Instruktur deleted successfully', deletedUser);
            return res.status(200).json(responseData);
        }catch(error){
            console.error('Error deleting instruktur:', error);
            responseData = new ResponseData('error', error as string, null);
            return res.status(500).json(responseData);
        }
    }

    static async getIdInstruktur(req: NextApiRequest, res: NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {query} = req.body;
            let idInstruktur;
            if (!query){
                idInstruktur = await prisma.instruktur.findMany({
                    select:{
                        id:true
                    }
                });
            }else{
                idInstruktur = await prisma.instruktur.findMany({
                    where:{
                        nama_lengkap: {
                          contains: query  
                        }
                    },
                    select:{
                        id:true
                    }
                });
            }
            
            if (!idInstruktur || idInstruktur.length === 0){
                responseData = new ResponseData("error", "Can't read data", null);
                console.log(responseData);
                return res.status(404).json(responseData);
            }
            else{
                responseData = new ResponseData("success", 'data retreived', idInstruktur)
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

export default InstrukturController;