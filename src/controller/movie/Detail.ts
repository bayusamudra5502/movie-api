import express from 'express';
import { type AuthRequest } from '../../middleware/Auth';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function MovieDetail(
  req: AuthRequest,
  res: express.Response,
) {
  const { uid } = req.params;
  const data = await prisma.movie.findUnique({
    where: {
      movieId: parseInt(uid),
    },
  });

  res.json({
    status: 'success',
    message: 'Success',
    data,
  });
}
