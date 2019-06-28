const express = require('express')
const routes = require('./routes')

class App {

    constructor() {
        // Instancia o expres
        this.server = express();

        // Carrega os middlewares
        this.middlewares();

        // Carrega as rotas
        this.routes();
    }

    middlewares() {
        // Prepara a aplicação para receber chamadas em JSON
        this.server.use(express.json());
    }

    routes() {
        // Configura as rotas para a aplicação
        this.server.use(routes)
    }
}


// Exporta a instância de server
module.exports = new App().server;