import type { NextApiRequest, NextApiResponse } from 'next';
import KendaraanController from '@/app/controllers/KendaraanController';
import ResponseData from '@/app/utils/Response';
import InstrukturController from '@/app/controllers/InstrukturController';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    if (req.method === "GET"){
        return InstrukturController.getIdInstruktur(req, res);
    }
}