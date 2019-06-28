import { Router } from 'express';

const routes = new Router();

// Define a rota principal da aplicação
routes.get('/', (req, res) => {
    return res.json({ message: 'Hello World'})
})

export default routes;