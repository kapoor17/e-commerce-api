import { Express } from 'express';
import authRouter from '../routes/auth.route';

const routesLoader = (app: Express) => {
  app.use('/auth', authRouter);
};

export default routesLoader;
