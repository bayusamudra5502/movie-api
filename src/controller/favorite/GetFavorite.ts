import express from 'express';
import { type AuthRequest } from '../../middleware/Auth';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function GetFavorites(
  req: AuthRequest,
  res: express.Response,
) {
  if (req.user) {
    try {
      const favorites = await prisma.favorite.findMany({
        where: {
          userId: req.user.userId,
        },
      });

      res.json({
        status: 'success',
        message: 'success',
        data: favorites,
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        status: 'fatal',
        message: 'Internal Server Error',
        data: err,
      });
    }
  } else {
    res.status(403).json({
      status: 'error',
      message: 'Unauthorized User',
      data: null,
    });
  }
}
