import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/users', UserController.store);

// Define a rota principal da aplicação
routes.get('/', (req, res) => res.json({ message: 'Hello World' }));

export default routes;
