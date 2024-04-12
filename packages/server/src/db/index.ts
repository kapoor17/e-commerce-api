
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || ""),
    database: process.env.PGDATABSE,
    password: process.env.PGPASSWORD
})

pool.on("connect", (client) => console.log('Connected to the Database successfully'));
pool.on("error", (error) => console.error(`Error while connecting to the Database: ${error}`));

export default pool;