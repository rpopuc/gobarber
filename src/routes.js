import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

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

// Rota para upload de arquivo
const upload = multer(multerConfig);
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
