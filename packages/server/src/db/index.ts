
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT || ""),
    database: process.env.PG_DATABASE
});

const establishPGClient = async () => {
    try{
        const client = await pool.connect();
        console.log('Successfully connected to the database!!');
        return client;
    }catch(err){
        console.error(`Error connecting to the Database: ${err}`);
        throw err; 
    }
}

export const testDBConnection = async () => {
    const client = await establishPGClient();
    client?.release();
}

export default {query: (text: string, params?: any[]) => pool.query(text, params)};