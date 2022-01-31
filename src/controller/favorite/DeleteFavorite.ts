import express from 'express';
import { type AuthRequest } from '../../middleware/Auth';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function DeleteFavorite(
  req: AuthRequest,
  res: express.Response,
) {
  if (req.user) {
    const { id } = req.params;

    try {
      const data = await prisma.favorite.findFirst({
        where: {
          userId: req.user.userId,
          movieId: parseInt(id),
        },
      });

      if (data) {
        await prisma.favorite.delete({
          where: {
            favoriteId: data.favoriteId,
          },
        });

        res.json({
          status: 'success',
          message: 'success',
          data: null,
        });
      } else {
        res.json({
          status: 'success',
          message: 'Nothing changed',
          data: null,
        });
      }
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
