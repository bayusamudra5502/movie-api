import type express from 'express';
import Home from './Home';

import path from 'path';

export default function Views(app: express.Express) {
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '..', '/templates'));

  app.get('/', Home);
}
