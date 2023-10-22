const {db} = require("../../db.connection")

async function getProducts(req, res, next) {
    try {
        const result = await db.manyOrNone('SELECT * FROM "products"');
        if (result == null){
            return res.status(404).json({
                message: "Did not find any record that matches requirements"
            })
        } else {
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message ? error.message : 'Something went wrong'
        });
    }
}

async function getProduct(req, res, next) {
    try {
        const id = req.params.productId;
        const result = await db.oneOrNone('SELECT * FROM "products" WHERE "id" = $1', [id]);
        if (result == null){
            return res.status(404).json({
                message: "Did not find any record that matches requirements"
            })
        } else {
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message ? error.message : 'Something went wrong'
        });
    }
}

async function addProduct(req, res, next) {
    console.log(req.file);
    try {
        const name = req.body.name;
        const price = req.body.price;
        const productImage = file.path;
        await db.none('INSERT INTO products(name, price, product_image) VALUES ($1, $2, $3)', [name, price, productImage]);
        return res.status(201).json({
            message: "Product created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message ? error.message : 'Something went wrong'
        });
    }
}

async function updateProduct(req, res, next) {
    try {
        const id = req.params.productId;
        const name = req.body.name;
        const price = req.body.price;
        await db.none('UPDATE products SET name=$1, price=$2 WHERE id=$3', [name, price, id]);
        return res.status(200).json({
            message: "Product updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message ? error.message : 'Something went wrong'
        });
    }
}

async function deleteProduct(req, res, next) {
    try {
        const id = req.params.productId;
        await db.none('DELETE FROM products WHERE id=$1', [id]);
        return res.status(200).json({
            message: "Product deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message ? error.message : 'Something went wrong'
        });
    }
}

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}