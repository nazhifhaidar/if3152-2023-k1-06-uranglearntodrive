import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import ResponseData from '@/app/utils/Response'

class AdminController{
    prisma = prisma;
    static async handleAdminManager(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {query} = req.body;
            let admins;
            if (!query){
                admins = await prisma.user.findMany({
                    where:{
                        role: "ADMIN"
                    }
                });
            }else{
                admins = await prisma.user.findMany({
                    where:{
                        username: {
                          contains: query  
                        },
                        role: "ADMIN"
                    }
                });
            }
            
            if (!admins || admins.length === 0){
                responseData = new ResponseData("error", "Can't read data", null);
                console.log(responseData);
                return res.status(404).json(responseData);
            }
            else{
                responseData = new ResponseData("success", 'data retreived', admins)
                
            }
            console.log(responseData);
            return res.status(200).json(responseData);
        }catch(e: any){
            responseData =  new ResponseData("error", e.message, null);
            console.log(responseData);
            return res.status(500).json(responseData);
        }
        
    }
    static async handleMembuatAkun(){

    }

    static async handleHapusAkun(){

    }
}

export default AdminController;