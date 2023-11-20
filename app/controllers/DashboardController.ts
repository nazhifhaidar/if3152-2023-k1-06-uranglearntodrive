import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import ResponseData from '@/app/utils/Response'

class DashboardController{
    prisma = prisma;
    static async handleDashboardManager(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {query} = req.body;
            let skejul;
            if (!query){
                skejul = await prisma.jadwal.findMany();
            }else{
                skejul = await prisma.jadwal.findMany({
                    where:{
                        tanggal: {
                          contains: query  
                        }
                    }
                });
            }
            
            if (!skejul || skejul.length === 0){
                responseData = new ResponseData("error", "Can't read data", null);
                console.log(responseData);
                return res.status(404).json(responseData);
            }
            else{
                responseData = new ResponseData("success", 'data retreived', jadwal)
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

export default DashboardController;