import type { NextApiRequest, NextApiResponse } from 'next';
import InstrukturController from '@/app/controllers/InstrukturController';
import ResponseData from '@/app/utils/Response';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    if (req.method === "GET"){
        return InstrukturController.handleInstrukturManager(req, res);
    }
    else if(req.method =='POST'){
      return InstrukturController.handleMembuatInstruktur(req,res);
    }else{
      return res.status(405).json(new ResponseData("error", "Method Not Available", null));
    }
  }