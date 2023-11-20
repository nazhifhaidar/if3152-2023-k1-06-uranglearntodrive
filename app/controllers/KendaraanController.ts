import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import ResponseData from '@/app/utils/Response'

class KendaraanController{
    prisma = prisma;
    static async handleKendaraanManager(req: NextApiRequest, res: NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {query} = req.body;
            let kendaraans;
            if (!query){
                kendaraans = await prisma.kendaraan.findMany();
            }else{
                kendaraans = await prisma.kendaraan.findMany({
                    where:{
                        nama: {
                          contains: query  
                        }
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
    static async handleCreateKendaraan(){

    }

    static async handleDeleteKendaraan(){

    }
}

export default KendaraanController;