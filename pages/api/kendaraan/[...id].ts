import type { NextApiRequest, NextApiResponse } from 'next';
import ResponseData from '@/app/utils/Response';
import KendaraanController from '@/app/controllers/KendaraanController';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ){
    if (req.method === "GET"){
        return KendaraanController.getKendaraanbyId(req, res);
    }
    else if (req.method === 'DELETE'){
        return KendaraanController.handleDeleteKendaraan(req,res);
    }
    else if(req.method === 'PUT'){
        return KendaraanController.handleUbahKendaraan(req,res);
    }
    else if (req.method === 'POST'){
        return KendaraanController.handleCreateKendaraan(req, res);
    }
    else{
        return res.status(405).json(new ResponseData("error", "Method Not Available", null));
      }
  }