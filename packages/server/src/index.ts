import 'dotenv/config'
import express from 'express';
import pool from './db/index.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
const rateLimiter = require('rate-limiter');
const xss = require('xss-clean');
const app = express();

app.set('trust proxy', 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
}));
app.use(bodyParser.json())
app.use(cors());
app.use(helmet());
app.use(xss());

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening at PORT: ${PORT}`));
console.log(await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'; "))