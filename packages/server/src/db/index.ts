
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || ""),
    database: process.env.PGDATABASE
});

const testDBConnection = async () => {
    try{
        const client = pool.connect();
        console.log('Successfully connected to the database!!');
        return client;
    }catch(err){
        console.error(`Error connecting to the Database: ${err}`);
    }
}

export const connectDB = async () => {
    const client = await testDBConnection();
    client?.release();
}

export default {query: (text: string, params?: any[]) => pool.query(text, params)};