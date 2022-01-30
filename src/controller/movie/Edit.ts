import express from 'express';
import { type AuthRequest } from '../../middleware/Auth';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function EditMovie(
  req: AuthRequest,
  res: express.Response,
) {
  if (req.user) {
    const { image, release, sinopsis, title, categoryId } = req.body;
    const { id } = req.params;

    try {
      await prisma.movie.update({
        data: {
          image,
          release,
          sinopsis,
          title,
          authorId: req.user.userId,
          categoryId,
        },
        where: {
          movieId: parseInt(id),
        },
      });

      res.json({
        status: 'success',
        message: 'success',
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
