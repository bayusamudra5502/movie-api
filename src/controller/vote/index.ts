import type express from 'express';
import AddVote from './AddVote';
import DeleteVote from './DeleteVote';
import EditVote from './EditVote';
import MovieVote from './MovieVote';

export default function VoteController(app: express.Express) {
  app.get('/movie/:id/vote', MovieVote);
  app.post('/movie/:id/vote', AddVote);
  app.put('/movie/:id/vote', EditVote);
  app.delete('/movie/:id/vote', DeleteVote);
}
