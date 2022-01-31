import express from 'express';
import { type AuthRequest } from '../../middleware/Auth';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function MovieDetail(
  req: AuthRequest,
  res: express.Response,
) {
  try {
    const { id } = req.params;
    const data = await prisma.movie.findUnique({
      where: {
        movieId: parseInt(id),
      },
    });

    if (data) {
      res.json({
        status: 'success',
        message: 'Success',
        data,
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Movie Not Found',
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
}
