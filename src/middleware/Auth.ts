import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import fs from 'fs';
import path from 'path';

export interface User {
  userId: string;
}

export interface AuthRequest extends express.Request {
  user?: User | null;
}

export function decodeToken(token: string): User | null {
  const privateKey = fs.readFileSync(
    path.join(__dirname, '..', 'private/auth.key'),
  );

  try {
    return jwt.verify(token, privateKey) as User;
  } catch (err) {
    return null;
  }
}

export function encodeToken(payload: User): string {
  const privateKey = fs.readFileSync(
    path.join(__dirname, '..', 'private/auth.key'),
  );
  return jwt.sign(payload, privateKey, { expiresIn: '3d' });
}

export default function AuthMiddleware(
  req: AuthRequest,
  res: express.Response,
  next: express.NextFunction,
) {
  const headerToken = req.headers['authorization'];
  const token = headerToken?.split(' ')[1] ?? null;
  const UserObject = token ? decodeToken(token) : null;

  req.user = UserObject;
  next();
}
