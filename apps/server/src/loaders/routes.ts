import { Express } from 'express';
import authRouter from '../routes/auth.route';

const routesLoader = (app: Express) => {
  app.get('/', (req, res) => res.send('Hello World!'));
  app.use('/auth', authRouter);
};

export default routesLoader;
