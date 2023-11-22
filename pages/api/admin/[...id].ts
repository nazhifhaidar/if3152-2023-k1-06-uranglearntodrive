import type { NextApiRequest, NextApiResponse } from 'next';
import AdminController from '@/app/controllers/AdminController';
import ResponseData from '@/app/utils/Response';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ){
    if (req.method === 'DELETE'){
        return AdminController.handleHapusAkun(req,res);
    }else{
        return res.status(405).json(new ResponseData("error", "Method Not Available", null));
      }
  }