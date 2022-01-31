import express from 'express';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function Home(_: any, res: express.Response) {
  const movies = await prisma.movie.findMany({
    include: {
      category: {
        select: {
          categoryName: true,
        },
      },
    },
  });

  res.render('home', {
    count: movies.length,
    movies,
  });
}
