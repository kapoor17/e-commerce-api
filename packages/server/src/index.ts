import 'express-async-errors';

import express from 'express';
import appLoader from './loaders/index';
import { testDBConnection } from './db/index';
import config from './config/index';

const app = express();

const { PORT } = config.server;
const startServer = async () => {
  try {
    appLoader(app);
    await testDBConnection();
    app.listen(PORT, () => console.log(`Server listening at PORT: ${PORT}`));
  } catch (error) {
    console.error(`Error while connecting to the server: ${error}`);
  }
};
startServer();
