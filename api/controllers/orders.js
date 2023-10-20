const {db} = require("../../db.connection")

async function getOrders(req, res, next) {
    try {
        const result = await db.many('SELECT o.id, o.product_id, o.quantity, p.name, p.price FROM orders o INNER JOIN products p ON o.product_id = p.id');
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

async function getOrder(req, res, next) {
    try {
        const orderId = req.params.orderId;
        const result = await db.oneOrNone('SELECT o.id, o.product_id, o.quantity, p.name, p.price FROM orders o INNER JOIN products p ON o.product_id = p.id WHERE o.id = $1', [orderId]);if (result == null){
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

async function addOrder(req, res, next) {
    try {
        const productId = req.body.productId;
        const quantity = req.body.quantity;
        if (quantity == null) {
            await db.none('INSERT INTO orders(product_id) VALUES($1)', [productId]);
        } else {
            await db.none('INSERT INTO orders(product_id, quantity) VALUES($1, $2)', [productId, quantity]);
        }
        return res.status(201).json({
            message: "Order created successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message ? error.message : 'Something went wrong'
        });
    }
}

async function deleteOrder(req, res, next) {
    try {
        const orderId = req.params.orderId;
        await db.none('DELETE FROM orders WHERE id = $1', [orderId]);
        return res.status(200).json({
            message: "Order deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message ? error.message : 'Something went wrong'
        });
    }
}



module.exports = {
    getOrders,
    getOrder,
    addOrder,
    deleteOrder
}