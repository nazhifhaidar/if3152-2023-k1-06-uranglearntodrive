import type { NextApiRequest, NextApiResponse } from 'next';
import InstrukturController from '@/app/controllers/InstrukturController';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    if (req.method === "GET"){
        return InstrukturController.handleInstrukturManager(req, res);
    }
    else if(req.method =="POST"){
      return InstrukturController.handleMembuatInstruktur(req,res);
    }
  }