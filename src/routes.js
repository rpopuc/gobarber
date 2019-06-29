import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

// Obtém o middleware de autenticação
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Define as rotas desprotegidas
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// A partir desse ponto, todas as rotas
// São protegidas por autenticação
routes.use(authMiddleware);
routes.put('/users', authMiddleware, UserController.update);

// Define a rota principal da aplicação
routes.get('/', (req, res) => res.json({ message: 'Hello World' }));

export default routes;
