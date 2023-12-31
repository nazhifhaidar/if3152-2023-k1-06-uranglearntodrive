import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import ResponseData from '@/app/utils/Response'
import bcrypt from 'bcryptjs'

class LoginController{
    prisma = prisma;
    static async HandleLogin(
        req: NextApiRequest,
        res: NextApiResponse,
      ) {
        let responseData: ResponseData<any>;
        if (req.method === 'POST') {
          const { username, password} = req.body;
          const user = await prisma.user.findUnique({
            where: { username: username },
          });
          if (!user) {
            responseData = new ResponseData("error", "user not found", null)
            return res.status(401).json(responseData);
          }
          const matchPassword = await bcrypt.compare(password as string, user.password as string)
          if (!matchPassword){
            responseData = new ResponseData("error", "invalid password", null)
            return res.status(401).json(responseData);
          }
          responseData = new ResponseData("success", "data retrieved", user)
          return res.status(200).json(responseData);

        } else {
            return res.status(405).json(null);
        }
      }
}

export default LoginController.HandleLogin;