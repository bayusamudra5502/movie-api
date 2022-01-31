import express from 'express';
import { type AuthRequest } from '../../middleware/Auth';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function AddVote(req: AuthRequest, res: express.Response) {
  if (req.user) {
    try {
      const { id: movieId } = req.params;
      const { vote } = req.body;
      const { userId } = req.user;

      if (0 >= parseInt(vote) || parseInt(vote) > 5) {
        res.status(400).json({
          status: 'error',
          message: 'Vote must be greater than 0 and lower or equal than 5',
          data: null,
        });

        return;
      }

      const data = await prisma.vote.findFirst({
        where: {
          movieId: parseInt(movieId),
          userId: req.user.userId,
        },
      });

      if (!data) {
        await prisma.vote.create({
          data: {
            vote,
            userId,
            movieId: parseInt(movieId),
          },
        });

        res.json({
          status: 'success',
          message: 'success',
          data: null,
        });
      } else {
        await prisma.vote.update({
          where: {
            voteId: data.voteId,
          },
          data: {
            vote,
          },
        });

        res.json({
          status: 'success',
          message: 'success with edit',
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
  } else {
    res.status(401).json({
      status: 'error',
      message: 'Unauthorized User',
      data: null,
    });
  }
}
