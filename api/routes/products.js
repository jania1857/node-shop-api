const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/productsimg');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + "_" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 100
    },
    fileFilter: fileFilter
});
const controller = require("../controllers/products")

router.get('/', controller.getProducts);

router.get('/:productId', controller.getProduct);

router.post('/', upload.single('productImage'), controller.addProduct);

router.patch('/:productId', controller.updateProduct);

router.delete('/:productId', controller.deleteProduct);

module.exports = router;