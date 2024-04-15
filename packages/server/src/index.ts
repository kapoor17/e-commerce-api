import 'dotenv/config'
import 'express-async-errors';

import express from 'express';
import appLoader from './loaders/index.js';
import { testDBConnection } from './db/index.js';

const app = express();

const PORT = process.env.PORT;
const startServer = async () => {
    try{
        appLoader(app);
        await testDBConnection();
        app.listen(PORT, () => 
            console.log(`Server listening at PORT: ${PORT}`)
        )
    }catch(error){
        console.error(`Error while connecting to the server: ${error}`);
    }
}
startServer();