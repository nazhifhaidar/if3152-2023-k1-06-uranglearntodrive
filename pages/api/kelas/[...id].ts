import type { NextApiRequest, NextApiResponse } from 'next';
import ResponseData from '@/app/utils/Response';
import KelasController from '@/app/controllers/KelasController';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ){
    if (req.method === 'DELETE'){
        return KelasController.handleHapusKelas(req,res);
    }
    else if(req.method === 'GET'){
        return KelasController.getKelasbyId(req,res);
    }
    else if(req.method === 'PUT'){
        return KelasController.handleUbahKelas(req,res);
    }
    else{
        return res.status(405).json(new ResponseData("error", "Method Not Available", null));
      }
  }