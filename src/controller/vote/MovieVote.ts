import express from 'express';
import { type AuthRequest } from '../../middleware/Auth';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function MovieVote(
  req: AuthRequest,
  res: express.Response,
) {
  try {
    const { id } = req.params;
    const data = await prisma.vote.aggregate({
      where: {
        movieId: parseInt(id),
      },
      _avg: {
        vote: true,
      },
      _count: {
        voteId: true,
      },
    });

    res.json({
      status: 'success',
      message: 'Success',
      data: {
        vote: data._avg?.vote ?? 0,
        count: data._count?.voteId ?? 0,
      },
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
