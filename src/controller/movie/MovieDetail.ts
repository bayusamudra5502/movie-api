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

    res.json({
      status: 'success',
      message: 'Success',
      data,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: 'fatal',
      message: 'Internal Server Error',
      data: err,
    });
  }
}
