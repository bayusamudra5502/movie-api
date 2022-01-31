import express from 'express';
import { type AuthRequest } from '../../middleware/Auth';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function EditVote(
  req: AuthRequest,
  res: express.Response,
) {
  if (req.user) {
    try {
      const { id } = req.params;
      const { vote } = req.body;

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
          movieId: parseInt(id),
          userId: req.user.userId,
        },
      });

      if (data) {
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
          message: 'success',
          data: null,
        });
      } else {
        res.status(404).json({
          status: 'error',
          message: 'No vote available',
          data: null,
        });
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    res.status(401).json({
      status: 'error',
      message: 'Unauthorized User',
      data: null,
    });
  }
}
