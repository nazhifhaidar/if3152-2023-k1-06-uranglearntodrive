import type { NextApiRequest, NextApiResponse } from 'next';
import PelangganController from '@/app/controllers/PelangganController';
import ResponseData from '@/app/utils/Response';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    if (req.method === "GET"){
        return PelangganController.handlePelangganManager(req, res);
    }
    else if (req.method === 'POST'){
        return PelangganController.addDataPelanggan(req,res);
    }
    else {
      return res.status(405).json(new ResponseData("error", "Method Not Available", null));
    }
  }