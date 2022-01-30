import express from 'express';
import AddCategory from './AddCategory';
import DeleteCategory from './DeleteCategory';
import EditCategory from './EditCategory';
import GetMoviesByCategories from './GetMoviesByCategory';
import ListCategories from './ListCategories';

export default function CategoryController(app: express.Express) {
  app.get('/category', ListCategories);
  app.get('/category/:id', GetMoviesByCategories);
  app.post('/category', AddCategory);
  app.put('/category/:id', EditCategory);
  app.delete('/category/:id', DeleteCategory);
}
