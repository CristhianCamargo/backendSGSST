import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit'
import winston from 'winston'
import expressWinston from 'express-winston'
import 'winston-daily-rotate-file';
import fileUpload from 'express-fileupload';

import authRoutes from '../routes/auth.routes';
import dataBase from '../database/connection';

import customerRoutes from '../routes/customer.routes';
import questionRoutes from '../routes/question.routes';
import roleRoutes from '../routes/role.routes';
import commentRoutes from '../routes/comment.routes';
import answerRoutes from '../routes/answer.routes';
import surveyRoutes from '../routes/survey.routes';
import validationRoutes from '../routes/validation.routes';

class Server {

  private app: Application;
  private port: string;
  private paths = {
    auth: '/api/auth',
    customer: '/api/customer',
    question: '/api/question',
    role: '/api/role',
    comment: '/api/comment',
    answer: '/api/answer',
    survey: '/api/survey',
    validation: '/api/validation'
  }

  private limiter = rateLimit( {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 2000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
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
    this.app.use( this.paths.customer, customerRoutes );
    this.app.use( this.paths.question, questionRoutes);
    this.app.use(this.paths.role, roleRoutes);
    this.app.use(this.paths.comment, commentRoutes);
    this.app.use(this.paths.answer, answerRoutes);
    this.app.use(this.paths.survey, surveyRoutes);
    this.app.use(this.paths.validation, validationRoutes);
    this.app.use( this.loggerError );
  }

  listen() {
    this.app.listen( this.port, () => {
      console.log( `😂 Servidor corriendo en puerto ${ this.port }` );
      
    } )
  }

}

export default Server;