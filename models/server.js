const express = require("express");
const socket = require("socket.io");
const http = require("http");
const cors = require("cors");
const dbConnect = require("../database/config");
const { _socketController } = require("../controller");

class Server {

    constructor() {

        this.paths = {
            auth: '/api/v1/auth'
        }

        this.app = express();
        this.server = http.createServer( this.app );
        this.io = socket( this.server,  {
            cors: {
               origin: "*",
               methods: ["GET", "POST", "PUT", "DELETE"]
            }
         } );

        this.connectDatabase()

        this.middlewares();

        this.socket();

        this.routes();

        this.listen();

    }

    async connectDatabase() {
        await dbConnect()
    }

    socket() {

        
        this.io.on( 'connection', (client) => _socketController( client, this.io ) )

    }

    middlewares() {
        this.app.use( cors() )
        this.app.use( express.json() )
    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/__authRoutes') )
    }

    listen() {
        this.server.listen( process.env.PORT, () => {
            console.log(`Listening in port: ${ process.env.PORT }`)
        } )
    }

}

module.exports = Server