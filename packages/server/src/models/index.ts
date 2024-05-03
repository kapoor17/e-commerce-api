import pg from 'pg';
import config from '../config';
const { Pool } = pg;

const { PG_USER, PG_HOST, PG_PORT, PG_DATABASE } = config.postgre_db;
const pool = new Pool({
  user: PG_USER,
  host: PG_HOST,
  port: parseInt(PG_PORT || ''),
  database: PG_DATABASE
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
