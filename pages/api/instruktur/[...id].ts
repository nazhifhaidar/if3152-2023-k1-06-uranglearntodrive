import type { NextApiRequest, NextApiResponse } from 'next';
import ResponseData from '@/app/utils/Response';
import InstrukturController from '@/app/controllers/InstrukturController';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ){
    if (req.method === 'DELETE'){
        return InstrukturController.handleHapusInstruktur(req,res);
    }
    else if(req.method === 'GET'){
        return InstrukturController.getInstrukturbyId(req,res);
    }
    else if(req.method === 'PUT'){
        return InstrukturController.handleUbahInstruktur(req,res);
    }
    else{
        return res.status(405).json(new ResponseData("error", "Method Not Available", null));
      }
  }