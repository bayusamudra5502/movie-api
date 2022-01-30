import express from 'express';
import { type AuthRequest } from '../../middleware/Auth';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function DeleteMovie(
  req: AuthRequest,
  res: express.Response,
) {
  if (req.user) {
    try {
      const { id } = req.params;
      await prisma.movie.delete({
        where: {
          movieId: parseInt(id),
        },
      });

      res.json({
        status: 'success',
        message: 'Success',
        data: null,
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
