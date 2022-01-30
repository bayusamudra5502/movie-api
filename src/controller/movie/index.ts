import type express from 'express';
import AddMovie from './AddMovie';
import DeleteMovie from './DeleteMovie';
import EditMovie from './Edit';
import ListMovies from './ListMovies';
import MovieDetail from './MovieDetail';

export default function MovieController(app: express.Express) {
  app.get('/movie', ListMovies);
  app.get('/movie/:id', MovieDetail);
  app.post('/movie', AddMovie);
  app.put('/movie/:id', EditMovie);
  app.delete('/movie/:id', DeleteMovie);
}
