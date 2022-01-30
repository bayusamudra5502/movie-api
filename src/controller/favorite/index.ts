import type express from 'express';
import AddFavorite from './AddFavorite';
import DeleteFavorite from './DeleteFavorite';
import GetFavorites from './GetFavorite';
import GetFavoriteByMovie from './GetFavoriteByMovie';

export default function FavoriteController(app: express.Express) {
  app.get('/movie/:id/favorite', GetFavoriteByMovie);
  app.get('/favorite', GetFavorites);
  app.post('/movie/:id/favorite', AddFavorite);
  app.delete('/movie/:id/favorite', DeleteFavorite);
}
