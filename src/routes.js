import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Define a rota principal da aplicação
routes.get('/', (req, res) => res.json({ message: 'Hello World' }));

export default routes;
