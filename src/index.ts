import express from 'express';
import path from 'path';
import AuthMiddleware, { AuthRequest } from './middleware/Auth';

const app = express();
const port = parseInt(process.env.PORT ?? '8080');

// Middleware
app.use(express.json());
app.use(AuthMiddleware);

// Static Route
app.use('/static', express.static(path.join(__dirname, '/static')));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/templates'));

// Route
app.get('/', (req, res) => {
  res.render('home');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});