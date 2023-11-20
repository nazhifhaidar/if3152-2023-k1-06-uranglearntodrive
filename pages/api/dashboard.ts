import type { NextApiRequest, NextApiResponse } from 'next';
import DashboardController from '@/app/controllers/DashboardController';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    if (req.method === "GET"){
        return DashboardController.handleDashboardManager(req, res);
    }
  }