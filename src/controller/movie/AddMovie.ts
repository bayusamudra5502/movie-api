import express from 'express';
import { type AuthRequest } from '../../middleware/Auth';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function AddMovie(
  req: AuthRequest,
  res: express.Response,
) {
  if (req.user) {
    const { image, release, synopsis, title, categoryId } = req.body;

    try {
      await prisma.movie.create({
        data: {
          image,
          release,
          synopsis,
          title,
          authorId: req.user.userId,
          categoryId,
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
    res.status(401).json({
      status: 'error',
      message: 'Unauthorized User',
      data: null,
    });
  }
}
