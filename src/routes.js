import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/test', async (req, res) => {
  const user = await User.create({
    name: 'Teste',
    email: 'teste@localhost.dev',
    password_hash: 'teste',
  });

  return res.json(user);
});

// Define a rota principal da aplicação
routes.get('/', (req, res) => res.json({ message: 'Hello World' }));

export default routes;
