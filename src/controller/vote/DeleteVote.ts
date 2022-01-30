import express from 'express';
import { type AuthRequest } from '../../middleware/Auth';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function DeleteVote(
  req: AuthRequest,
  res: express.Response,
) {
  if (req.user) {
    try {
      const { id } = req.params;

      const data = await prisma.vote.findFirst({
        where: {
          movieId: parseInt(id),
          userId: req.user.userId,
        },
      });

      if (data?.voteId) {
        await prisma.vote.delete({
          where: {
            voteId: data.voteId,
          },
        });

        res.json({
          status: 'success',
          message: 'success',
          data: null,
        });
      } else {
        res.json({
          status: 'success',
          message: 'No Change',
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
    res.status(403).json({
      status: 'error',
      message: 'Unauthorized User',
      data: null,
    });
  }
}
