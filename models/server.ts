import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit'
import winston from 'winston'
import expressWinston from 'express-winston'
import 'winston-daily-rotate-file';
import fileUpload from 'express-fileupload';

import authRoutes from '../routes/auth';
import dataBase from '../database/connection';

class Server {

  private app: Application;
  private port: string;
  private paths = {
    auth: '/api/auth'
  }

  private limiter = rateLimit( {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  } );

  private loggerConsole = expressWinston.logger( {
    transports: [
      new ( winston.transports.Console ) (),
      new ( winston.transports.DailyRotateFile ) ( {
        filename: 'logs/success-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
      } )
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  } );

  private loggerError = expressWinston.errorLogger( {
    transports: [
      new ( winston.transports.Console ) (),
      new ( winston.transports.DailyRotateFile ) ( {
        filename: 'logs/error-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
      } )
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
      winston.format.timestamp( {
        format: 'YYYY-MM-DD hh:mm:ss.SSS A'
      } ),
      winston.format.align(),
    )
  } );

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';
    this.databaseConnection();
    this.middlewares();
    this.routes();
  }

  async databaseConnection () {
    try {
      await dataBase.authenticate();
      console.log( 'Database online' )
    } catch ( error: any ) {
      throw new Error( error );
    }
  }

  middlewares() {
    this.app.use( cors() );
    this.app.use( express.json( { limit: '100kb' } ) );
    this.app.use( express.static( 'public' ) );
    this.app.use( helmet() );
    this.app.use( this.limiter );
    this.app.use( this.loggerConsole );
    this.app.use( fileUpload( {
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
    } ) );
  }
  
  routes() {
    this.app.use( this.paths.auth, authRoutes );
    this.app.use( this.loggerError );
  }

  listen() {
    this.app.listen( this.port, () => {
      console.log( `Servidor corriendo en puerto ${ this.port }` );
      
    } )
  }

}

export default Server;