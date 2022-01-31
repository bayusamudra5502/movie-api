import type express from 'express';
import AuthController from './Auth/index';
import CategoryController from './category';
import FavoriteController from './favorite';
import MovieController from './movie';
import VoteController from './vote';

export default function Controller(app: express.Express) {
  VoteController(app);
  AuthController(app);
  CategoryController(app);
  FavoriteController(app);
  MovieController(app);
}
