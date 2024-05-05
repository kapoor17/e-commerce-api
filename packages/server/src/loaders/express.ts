import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import sessionLoader from './session';
import routesLoader from './routes';
import { errorHandler, notFound } from '../middlewares';
import cors from 'cors';
import passportLoader from './passport';

const expressLoader = (): Express => {
  const app = express();

  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());

  sessionLoader(app);
  passportLoader(app);
  routesLoader(app);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default expressLoader;
