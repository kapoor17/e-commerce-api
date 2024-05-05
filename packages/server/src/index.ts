import 'express-async-errors';
import appLoader from './loaders/express';
import { testDBConnection } from './models/index';
import config from './config/index';
import expressLoader from './loaders/express';

const app = expressLoader();

const { PORT } = config.server;
const startServer = async () => {
  try {
    await testDBConnection();
    app.listen(PORT, () => console.log(`Server listening at PORT: ${PORT}`));
  } catch (error) {
    console.error(`Error while connecting to the server: ${error}`);
  }
};
startServer();
