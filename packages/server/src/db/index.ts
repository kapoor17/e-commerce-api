
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || ""),
    database: process.env.PGDATABSE,
    password: process.env.PGPASSWORD
})

export default pool;