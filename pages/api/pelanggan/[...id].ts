import type { NextApiRequest, NextApiResponse } from 'next';
import ResponseData from '@/app/utils/Response';
import PelangganController from '@/app/controllers/PelangganController';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ){
    if (req.method === "GET"){
        return PelangganController.getPelangganbyId(req, res);
    }
    else if (req.method === 'DELETE'){
        return PelangganController.handleDeletePelanggan(req,res);
    }
    else if(req.method === 'PUT'){
        return PelangganController.handleUbahPelanggan(req,res);
    }
    // else if (req.method === 'POST'){
    //     return PelangganController.handleCreatePelanggan(req, res);
    // }
    else{
        return res.status(405).json(new ResponseData("error", "Method Not Available", null));
      }
  }