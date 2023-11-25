import type { NextApiRequest, NextApiResponse } from 'next';
import ResponseData from '@/app/utils/Response';
import JadwalController from '@/app/controllers/JadwalController';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ){
    if (req.method === 'DELETE'){
        return JadwalController.handleHapusJadwal(req,res);
    }
    else if(req.method === 'GET'){
        return JadwalController.getJadwalbyId(req,res);
    }
    else if(req.method === 'PUT'){
        return JadwalController.handleUbahJadwal(req,res);
    }
    else{
        return res.status(405).json(new ResponseData("error", "Method Not Available", null));
      }
  }