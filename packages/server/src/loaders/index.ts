import bodyParser from 'body-parser';
import { Express } from 'express';
import helmet from 'helmet';
import sessionLoader from './session';
import routesLoader from './routes';
import { errorHandler } from '../middlewares';

const appLoader = (app: Express) => {
  app.use(bodyParser.json());
  app.use(helmet());

  sessionLoader(app);
  routesLoader(app);

  app.use(errorHandler);
};

export default appLoader;
