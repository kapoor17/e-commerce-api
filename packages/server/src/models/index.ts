import pg from 'pg';
import config from '../config';
const { Pool } = pg;

const { PGUSER, PGHOST, PGPORT, PGDATABASE } = config.postgre_db;
const pool = new Pool({
  user: PGUSER,
  host: PGHOST,
  port: parseInt(PGPORT || ''),
  database: PGDATABASE
});

const establishPGClient = async () => {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to the database!!');
    return client;
  } catch (err) {
    console.error(`Error connecting to the Database: ${err}`);
    throw err;
  }
};

export const testDBConnection = async () => {
  const client = await establishPGClient();
  client?.release();
};

export default {
  query: (text: string, params?: any[]) => pool.query(text, params)
};
