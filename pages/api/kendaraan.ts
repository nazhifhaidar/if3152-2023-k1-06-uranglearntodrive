import type { NextApiRequest, NextApiResponse } from 'next';
import KendaraanController from '@/app/controllers/KendaraanController';
import ResponseData from '@/app/utils/Response';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    if (req.method === "GET"){
        return KendaraanController.handleKendaraanManager(req, res);
    }
    // else if (req.method === 'POST'){
    //     return KendaraanController.handleCreateKendaraan(req, res);
    else{
      return res.status(405).json(new ResponseData("error", "Method Not Available", null));
    }
  }