import express from 'express';
import { type AuthRequest } from '../../middleware/Auth';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function AddFavorite(
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

      if (!data) {
        await prisma.favorite.create({
          data: {
            movieId: parseInt(id),
            userId: req.user.userId,
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
    res.status(403).json({
      status: 'error',
      message: 'Unauthorized User',
      data: null,
    });
  }
}
