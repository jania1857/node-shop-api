const initOptions = {
    //
};

const pgp = require('pg-promise')(initOptions);
const cn = "postgres://" +
    process.env.pgusername + ":" +
    process.env.pgpassword + "@" +
    process.env.pghostname + ":" +
    process.env.pgport + "/" +
    process.env.pgdatabase;

const db = pgp(cn);

const productsInitQuery = `
    CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price NUMERIC NOT NULL
    )
`;


db.connect()
    .then(obj => {
        console.log('Connected with database');
        obj.done();
    })
    .catch(error => {
        console.error('Error when connecting with database: ', error);
    });

db.none(productsInitQuery)
    .then(() => {
        console.log('Table "Products" were created or already exists');
    })
    .catch(error => {
        console.error('Error when creating table "Products": ', error);
    });

module.exports = {
    pgp, db
};