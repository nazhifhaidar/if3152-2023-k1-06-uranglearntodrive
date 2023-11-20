import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import ResponseData from '@/app/utils/Response'

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
    static async handleCreateInstruktur(){

    }

    static async handleDeleteInstruktur(){

    }
}

export default InstrukturController;