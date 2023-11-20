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
                instrukturs = await prisma.instruktur.findMany();
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
            
            // const existingUser = await prisma.instruktur.findUnique({
            //     where: {
            //       username: username,
            //     },
            //   });
          
            //   if (existingUser) {
            //     responseData = new ResponseData('error', 'Username already exists', null);
            //     return res.status(400).json(responseData);
            //   }
            
            const newInstruktur = await prisma.instruktur.create({
                data:{
                    nama_lengkap:nama_lengkap,
                    nik:nik,
                    alamat:alamat,
                    no_telp:no_telp,
                },
            })
            responseData = new ResponseData('success', 'Instructure created successfully', newInstruktur);
            return res.status(200).json(responseData);
        }catch(error){
            console.error('Error creating admin:', error);
            responseData = new ResponseData('error', 'Internal server error', null);
            return res.status(500).json(responseData);
        }
    }

    static async handleDeleteInstruktur(){

    }
}

export default InstrukturController;