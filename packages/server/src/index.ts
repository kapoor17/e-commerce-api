import 'dotenv/config'
import express from 'express';
import pool from './db/index.js'

const app = express();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening at PORT: ${PORT}`));
console.log(await pool.query('SELECT current_user'));