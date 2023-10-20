const express = require('express');
const router = express.Router();

const controller = require("../controllers/orders")

router.get('/', controller.getOrders);

router.get('/:orderId', controller.getOrder);

router.post('/', controller.addOrder);

router.delete('/:orderId', controller.deleteOrder);

module.exports = router;