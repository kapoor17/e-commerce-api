
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || ""),
    database: process.env.PGDATABASE
});

export const connectDB = () => {
    pool.connect((err, client, done) => {
        if(err){
            console.error(`Error connecting to the Database: ${err}`);
        }else{
            console.log('Successfully connected to the database!!');
            done();
        }
    });
}

export default {query: (text: string, params?: any[]) => pool.query(text, params)};