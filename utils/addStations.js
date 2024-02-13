/**
 * Este archivo fue usado para cargar la bd con los datos del archivo csv.
 * Es un archivo que yo hice hace mucho y siempre lo uso para cargar este tipo de info en la bd.
 */
const fs = require('fs');
const csv = require('csv-parser');
const { promisify } = require('util');
const pgp = require('pg-promise')();

const readFile = promisify(fs.readFile);

// Database configuration
const db = pgp({
    host: 'roundhouse.proxy.rlwy.net',
    port: 49588, 
    database: 'railway',
    user: 'postgres',
    password: 'e-5A-36bB*b612GC1C3e*-G4*E1bGe*d',
});

// Define the path to your CSV file (local file or URL)
const csvFilePath = '/Users/ulisescorral/Downloads/nomenclatura_2024_01.csv';

// Define the table name in PostgreSQL
const tableName = 'stations';

(async () => {
  try {
    const csvData = await readFile(csvFilePath, 'utf8');

    const records = [];

    const csvStream = csv()
      .on('data', (data) => {
        records.push(data);
      })
      .on('end', async () => {
        try {
          await db.tx(async (t) => {
            const insertQueries = records.map((record) =>
              t.none(
                'INSERT INTO ${table:name} (id, name, obcn, location, latitude, longitude, status) VALUES (${id}, ${name}, ${obcn}, ${location}, ${latitude}, ${longitude}, ${status})',
                {
                  table: tableName,
                  ...record,
                }
              )
            );
            await t.batch(insertQueries);
          });

          console.log(`Successfully inserted ${records.length} records into the ${tableName} table.`);
        } catch (error) {
          console.error('Error inserting records:', error);
        } finally {
          pgp.end(); 
        }
      });

    fs.createReadStream(csvFilePath).pipe(csvStream);
  } catch (error) {
    console.error('Error reading CSV file:', error);
  }
})();
