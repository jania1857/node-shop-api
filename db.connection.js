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

const ordersInitQuery = `
    CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        product_id SERIAL NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        FOREIGN KEY (product_id)
            REFERENCES products (id)
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
        console.log('Table "Products" was created or already exists');
    })
    .catch(error => {
        console.error('Error when creating table "Products": ', error);
    });

db.none(ordersInitQuery)
    .then(() => {
        console.log('Table "Orders" was created or already exists');
    })
    .catch(error => {
        console.error('Error when creating table "Orders": ', error);
    })

module.exports = {
    pgp, db
};