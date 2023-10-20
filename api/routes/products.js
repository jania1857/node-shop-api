const express = require('express');
const router = express.Router();

const controller = require("../controllers/products")

router.get('/', controller.getProducts);

router.get('/:productId', controller.getProduct);

router.post('/', controller.addProduct);

router.patch('/:productId', controller.updateProduct);

router.delete('/:productId', controller.deleteProducts);

module.exports = router;