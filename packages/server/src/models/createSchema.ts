import { promises } from 'fs';
import path from 'path';
import { Client } from 'pg';

const createSchema = async () => {
  const client = new Client();
  const DB_INIT = await readFilesFromDirectory(__dirname + '/DB_INIT');
  const TABLES = await readFilesFromDirectory(__dirname + '/TABLES');
  const RELATIONS = await readFilesFromDirectory(__dirname + '/RELATIONS');

  await client
    .connect()
    .then(async () => {
      try {
        DB_INIT.forEach(async (file) => {
          const res = await client.query(file);
          console.log(res.rows);
        });
      } catch (err) {
        console.log(`Error while Initializing the Database: ${err}`);
        throw err;
      }
    })
    .then(async () => {
      TABLES.forEach(async (file) => {
        try {
          const res = await client.query(file);
          console.log(res.rows);
        } catch (err) {
          console.log(`Error while creating Tables in the Database: ${err}`);
          throw err;
        }
      });
    })
    .then(async () => {
      try {
        RELATIONS.forEach(async (file) => {
          const res = await client.query(file);
          console.log(res.rows);
        });
      } catch (err) {
        console.log(`Error while creating Relations in the Database: ${err}`);
        throw err;
      }
    })
    .catch((err) => {
      console.log(err);
      client.end();
      throw err;
    });

  process.exit();
};

const readFilesFromDirectory = async (
  directoryName: string
): Promise<string[]> => {
  try {
    const files = await promises.readdir(directoryName);

    let sqlFiles = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(directoryName, file);
        const fileExtension = path.extname(filePath);

        if (fileExtension === '.sql') {
          const sql = await promises.readFile(filePath, 'utf-8');
          return sql;
        }

        return '';
      })
    );

    return sqlFiles.filter((file) => file.length > 0);
  } catch (err) {
    console.error(`Could not read file from ${directoryName}`);
    throw err;
  }
};

createSchema();
