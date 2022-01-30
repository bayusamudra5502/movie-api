import express from 'express';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function ListMovies(req: any, res: express.Response) {
  try {
    const movies = await prisma.movie.findMany();

    res.json({
      status: 'success',
      message: 'success',
      data: movies,
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
