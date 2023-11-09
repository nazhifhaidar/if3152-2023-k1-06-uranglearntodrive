import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import ResponseData from '@/app/utils/Response'
 
// type ResponseData = {
//   message: string
// }
 
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === 'POST') {
      const { username, password } = req.body;
  
      const user = await prisma.user.findUnique({
        where: { username },
      });
  
      if (!user) {
        const responseData = new ResponseData('error', 'User not found', null);
        return res.status(401).json(responseData);
      }
  
      if (user.password !== password) {
        const responseData = new ResponseData('error', 'Invalid username or password', null);
        return res.status(401).json(responseData);
      }
      
      const responseData = new ResponseData('success', 'Login successful', user);
      return res.status(200).json(responseData);
    } else {
        const responseData = new ResponseData('error', 'Method Not Allowed', null);
        return res.status(405).json(responseData);
    }
  }