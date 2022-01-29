import express from 'express';
import Login from './Login';
import Register from './Register';

export default function AuthController(app: express.Express) {
  app.post('/login', Login);
  app.post('/register', Register);
}
