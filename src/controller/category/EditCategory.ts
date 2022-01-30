import express from 'express';
import { type AuthRequest } from '../../middleware/Auth';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function EditCategory(
  req: AuthRequest,
  res: express.Response,
) {
  if (req.user) {
    const { id: categoryId } = req.params;
    const { categoryName } = req.body;

    try {
      await prisma.category.update({
        where: {
          categoryId,
        },
        data: {
          categoryName,
        },
      });

      res.json({
        status: 'success',
        message: 'success',
        data: null,
      });
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
