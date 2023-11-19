import type { NextApiRequest, NextApiResponse } from 'next';
import AdminController from '@/app/controllers/AdminController';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    if (req.method === "GET"){
        return AdminController.handleAdminManager(req, res);
    }
  }