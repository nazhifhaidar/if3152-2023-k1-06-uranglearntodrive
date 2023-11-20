import type { NextApiRequest, NextApiResponse } from 'next';
import KelasController from '@/app/controllers/KelasController';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    if (req.method === "GET"){
        return KelasController.handleKelasManager(req, res);
    }
  }