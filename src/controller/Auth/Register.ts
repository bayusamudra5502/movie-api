import { PrismaClient } from '@prisma/client';
import * as express from 'express';
import { AuthRequest } from '../../middleware/Auth';
import { default as validator } from 'validator';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export interface IRegister {
  email: string;
  roleName: string;
  password: string;
  verifyPassword: string;
}

function validateEmail(data: IRegister): boolean {
  const emailValidate = validator.isEmail(data.email);
  return emailValidate;
}

function validatePassword(data: IRegister): boolean {
  return data.password == data.verifyPassword;
}

export default async function Register(
  req: AuthRequest,
  res: express.Response,
) {
  if (req.user) {
    res.status(403).json({
      status: 'error',
      message: 'User was authenticated',
      data: null,
    });
    return;
  }

  if (!validateEmail(req.body)) {
    res.status(400).json({
      status: 'error',
      message: 'Email or password input is not valid',
      data: null,
    });
    return;
  }

  if (!validatePassword(req.body)) {
    res.status(400).json({
      status: 'error',
      message: 'Password and verify password are not match',
      data: null,
    });

    return;
  }

  if (!validator.isStrongPassword(req.body.password)) {
    res.status(400).json({
      status: 'error',
      message: 'Password is weak',
      data: null,
    });

    return;
  }

  // Validation Complete
  try {
    const salt = await bcrypt.genSalt();
    const saltedPassword = await bcrypt.hash(req.body.password, salt);

    await prisma.user.create({
      data: {
        email: req.body.email,
        password: saltedPassword,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'User added',
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: "Can't add new user",
      data: err,
    });
  }
}
