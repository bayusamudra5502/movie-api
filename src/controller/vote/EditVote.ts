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
        res.json({
          status: 'success',
          message: 'No changed',
          data: null,
        });
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    res.status(403).json({
      status: 'error',
      message: 'Unauthorized User',
      data: null,
    });
  }
}
