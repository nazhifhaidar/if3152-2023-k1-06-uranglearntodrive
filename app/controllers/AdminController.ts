import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import ResponseData from '@/app/utils/Response'
import bcrypt from 'bcryptjs'
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';

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
    static async handleMembuatAkun(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {username, name, email, password} = req.body;
            if (!username || !name || !email || !password ){
                responseData = new ResponseData("error", "Every attribute must be filled", null);
                return res.status(400).json(responseData)
            }
            
            const existingUser = await prisma.user.findUnique({
                where: {
                  username: username,
                },
              });
          
              if (existingUser) {
                responseData = new ResponseData('error', 'Username already exists', null);
                return res.status(400).json(responseData);
              }
            
            const newAdmin = await prisma.user.create({
                data:{
                    username:username,
                    name: name,
                    email: email,
                    password: bcrypt.hashSync(password),
                    role: 'ADMIN'
                },
            })
            
            responseData = new ResponseData('success', 'Admin created successfully', newAdmin);
            return res.status(200).json(responseData);
        }catch(error){
            console.error('Error creating admin:', error);
            responseData = new ResponseData('error', 'Internal server error', null);
            return res.status(500).json(responseData);
        }
    }

    static async handleHapusAkun(req: NextApiRequest, res:NextApiResponse){
        let responseData: ResponseData<any>;
        try{
            const {id} = req.body;
            const deletedUser = await prisma.user.delete({
                where:{
                    id:id
                }
            });
            responseData = new ResponseData('success', 'Admin deleted successfully', deletedUser);
            return res.status(200).json(responseData);
        }catch(error){
            console.error('Error deleting admin:', error);
            responseData = new ResponseData('error', error as string, null);
            return res.status(500).json(responseData);
        }
    }
}

export default AdminController;