import express from 'express';
import { type AuthRequest } from '../../middleware/Auth';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function GetFavoriteByMovie(
  req: AuthRequest,
  res: express.Response,
) {
  if (req.user) {
    try {
      const { id } = req.params;

      const favorite = await prisma.favorite.findFirst({
        where: {
          userId: req.user.userId,
          movieId: parseInt(id),
        },
      });

      res.json({
        status: 'success',
        message: 'success',
        data: {
          favorite: !!favorite,
        },
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
    res.status(401).json({
      status: 'error',
      message: 'Unauthorized User',
      data: null,
    });
  }
}
