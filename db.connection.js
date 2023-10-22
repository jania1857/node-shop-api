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
        price NUMERIC NOT NULL,
        product_image VARCHAR(255) NOT NULL
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

const usersInitQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    )
`;

async function initDB() {
    await db.none(productsInitQuery)
        .then(() => {
            console.log('Table "Products" was created or already exists');
        })
        .catch(error => {
            console.error('Error when creating table "Products": ', error);
        });

    await db.none(ordersInitQuery)
        .then(() => {
            console.log('Table "Orders" was created or already exists');
        })
        .catch(error => {
            console.error('Error when creating table "Orders": ', error);
        });

    await db.none(usersInitQuery)
        .then(() => {
            console.log('Table "Users" was created or already exists');
        })
        .catch(error => {
            console.error('Error when creating table "Users": ', error);
        })
}
db.connect()
    .then(obj => {
        console.log('Connected with database');
        obj.done();
    })
    .catch(error => {
        console.error('Error when connecting with database: ', error);
    });

initDB();



module.exports = {
    pgp, db
};