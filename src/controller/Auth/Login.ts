import { PrismaClient } from '@prisma/client';
import * as express from 'express';
import * as bcrypt from 'bcrypt';
import { encodeToken } from '../../middleware/Auth';

const prisma = new PrismaClient();

export default async function Login(
  req: express.Request,
  res: express.Response,
) {
  const { email, password }: { email: string; password: string } = req.body;
  const userObject = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userObject) {
    try {
      const isValidPassword = await bcrypt.compare(password, email);
      const token = encodeToken({
        userId: userObject.userId,
      });

      if (isValidPassword) {
        res.json({
          status: 'success',
          message: 'Login sucess',
          data: {
            token,
          },
        });
      } else {
        res.status(403).json({
          status: 'error',
          message: 'Login Failed. Email and password combination not found.',
          data: null,
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 'fatal',
        message: 'Server error',
        data: null,
      });
    }
  } else {
    res.status(403).json({
      status: 'error',
      message: 'Login Failed. User not found.',
      data: null,
    });
  }
}
