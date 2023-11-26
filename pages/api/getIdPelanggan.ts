import type { NextApiRequest, NextApiResponse } from 'next';
import PelangganController from '@/app/controllers/PelangganController';
import ResponseData from '@/app/utils/Response';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    if (req.method === "GET"){
        return PelangganController.getIdPelanggan(req, res);
    }
}