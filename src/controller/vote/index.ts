import type express from 'express';
import DeleteMovie from '../movie/DeleteMovie';
import AddVote from './AddVote';
import EditVote from './EditVote';
import MovieVote from './MovieVote';

export default function VoteController(app: express.Express) {
  app.get('/movie/:id/vote', MovieVote);
  app.post('/movie/:id/vote', AddVote);
  app.put('/movie/:id/vote', EditVote);
  app.delete('/movie/:id/vote', DeleteMovie);
}
