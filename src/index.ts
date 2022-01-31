import express from 'express';
import path from 'path';
import Controller from './controller';
import AuthMiddleware from './middleware/Auth';
import Views from './views';

const app = express();
const port = parseInt(process.env.PORT ?? '8080');

// Middleware
app.use(express.json());
app.use(AuthMiddleware);

// Static Route
app.use('/static', express.static(path.join(__dirname, '/static')));

Views(app);
Controller(app);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
