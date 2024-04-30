import dotenv from 'dotenv';

dotenv.config();

const {
  MONGO_PASSWORD = '',
  MONGO_USERNAME = '',
  MONGO_DB_NAME = 'db',
  PORT = '4000',
  SESSION_SECRET = '',
  NODE_ENV = 'development',
  PG_PORT = '4000',
  PG_USER = '',
  PG_HOST = '',
  PG_DATABASE = ''
} = process.env;

const config = {
  postgre_db: {
    PG_PORT,
    PG_USER,
    PG_HOST,
    PG_DATABASE
  },
  mongo_db: {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_URI: `mongodb+srv://${MONGO_USERNAME}:${encodeURIComponent(
      MONGO_PASSWORD
    )}@cluster0.87rgavf.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  },
  server: {
    PORT,
    NODE_ENV
  },
  session: {
    SESSION_SECRET
  }
};

export default config;
