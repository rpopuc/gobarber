import express from 'express';
import path from 'path';
import * as Sentry from '@sentry/node';
import Youch from 'youch';
import sentryConfig from './config/sentry';
import 'express-async-errors';
import routes from './routes';

import './database';

class App {
  constructor() {
    // Instancia o expres
    this.server = express();

    Sentry.init(sentryConfig);
    this.server.use(Sentry.Handlers.requestHandler());

    // Carrega os middlewares
    this.middlewares();

    // Carrega as rotas
    this.routes();

    this.server.use(Sentry.Handlers.errorHandler());

    this.exceptionHandler();
  }

  middlewares() {
    // Prepara a aplicação para receber chamadas em JSON
    this.server.use(express.json());

    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'upload'))
    );
  }

  routes() {
    // Configura as rotas para a aplicação
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      const errors = await new Youch(err, req).toJSON();
      return res.status(500).json(errors);
    });
  }
}

// Exporta a instância de server
export default new App().server;
