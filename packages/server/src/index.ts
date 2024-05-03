import 'express-async-errors';

import express from 'express';
import appLoader from './loaders/index';
import { testDBConnection } from './models/index';
import config from './config/index';

const app = express();

const { PORT } = config.server;
const startServer = async () => {
  try {
    await testDBConnection();
    appLoader(app);
    app.listen(PORT, () => console.log(`Server listening at PORT: ${PORT}`));
  } catch (error) {
    console.error(`Error while connecting to the server: ${error}`);
  }
};
startServer();
