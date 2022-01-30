import express from 'express';
import { type AuthRequest } from '../../middleware/Auth';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function GetMoviesByCategories(
  req: AuthRequest,
  res: express.Response,
) {
  try {
    const categoryId = req.params.id;
    const data = await prisma.movie.findMany({
      where: {
        categoryId,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'success',
      data,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: 'fatal',
      message: 'Internal server error',
      data: err,
    });
  }
}
