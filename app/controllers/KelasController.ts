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
    static async handleCreateKelas(){

    }

    static async handleHapusKelas(){

    }
}

export default KelasController;