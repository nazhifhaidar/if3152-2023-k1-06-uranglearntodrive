import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import ResponseData from '@/app/utils/Response'

class PelangganController{
    prisma = prisma;
    static async handlePelangganManager(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            let customer;
            const {query} = req.body;
            if (!query){
                customer = await prisma.pelanggan.findMany();
            }else{
                customer = await prisma.pelanggan.findMany({
                    where:{
                        nama_lengkap: {
                        contains: query  
                        }
                    }
                });
            }
            
            if (!customer || customer.length === 0){
                responseData = new ResponseData("error", "Can't read data", null);
                console.log(responseData);
                return res.status(404).json(responseData);
            }
            else{
                responseData = new ResponseData("success", 'data retreived', customer)
            }
            console.log(responseData);
            return res.status(200).json(responseData);
        }catch(e: any){
            responseData =  new ResponseData("error", e.message, null);
            console.log(responseData);
            return res.status(500).json(responseData);
        }
    }
    static async addDataPelanggan(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            let cust = async (kelasID: number) => {
                const response = await fetch(`/api/admin/${kelasID}`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" }
                });
            
                if (response.ok) {
                    // MASIH BELUM JALAN NGAB
                    
                } else {
                    // Handle error response
                    console.error('Error submitting form:', response.statusText);
                }
      };
            if (!cust){
                responseData = new ResponseData("error", "Conflicting data", null);
                console.log(responseData);
                return res.status(409).json(responseData);
            }
            else{
                responseData = new ResponseData("success", 'data retreived', cust)
            }
            console.log(responseData);
            return res.status(200).json(responseData);
        }
        catch(e: any){
            responseData =  new ResponseData("error", e.message, null);
            console.log(responseData);
            return res.status(500).json(responseData);
        }
    }
}

export default PelangganController;