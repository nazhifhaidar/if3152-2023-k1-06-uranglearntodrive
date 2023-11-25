import type { NextApiRequest, NextApiResponse } from 'next';
import KendaraanController from '@/app/controllers/KendaraanController';
import ResponseData from '@/app/utils/Response';
import KelasController from '@/app/controllers/KelasController';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    if (req.method === "GET"){
        return KelasController.getIdKelas(req, res);
    }
}