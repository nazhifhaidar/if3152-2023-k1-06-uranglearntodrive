import type { NextApiRequest, NextApiResponse } from 'next';
import InstrukturController from '@/app/controllers/InstrukturController';
import ResponseData from '@/app/utils/Response';
import PelangganController from '@/app/controllers/PelangganController';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    if (req.method === "GET"){
        return PelangganController.handlePelangganManager(req, res);
    }
  }