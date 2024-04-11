import 'dotenv/config'
import express from 'express';
import pool from './db/index.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(bodyParser.json())
app.use(cors());
app.use(helmet());

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening at PORT: ${PORT}`));
console.log(await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'; "))