import type { NextApiRequest, NextApiResponse } from 'next';
import KelasController from '@/app/controllers/KelasController';
import ResponseData from '@/app/utils/Response';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    if (req.method === "GET"){
        return KelasController.handleKelasManager(req, res);
    }else{
      return res.status(405).json(new ResponseData("error", "Method Not Available", null));
    }
    else if(req.method === "POST"){
      return KelasController.handleCreateKelas(req,res);
    }
  }