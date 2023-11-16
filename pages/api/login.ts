import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import ResponseData from '@/app/utils/Response'
import bcrypt from 'bcryptjs'
import HandleLogin from '@/app/controllers/LoginController'
 
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    return HandleLogin(req,res);
  }