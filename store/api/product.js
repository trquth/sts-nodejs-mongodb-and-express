const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, '/uploads/product')
    },
    filename: (req, file, callback) => {
        callback(null, new Date().toISOString() + file.originalname)
    }
})

const upload = multer({
    storage: storage
})

const Category = require('../models/category');

const Product = require('./../models/product');
const ProductImage = require('./../models/product-image');

router.post('/', upload.single('productImage'), (req, res, next) => {

    var product = new Product({
        _id: mongoose.Schema.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating,
        description: req.body.description,
        No: req.body.No,
        thumbnailImage: req.body.thumbnailImage,
    })

    product.save().then(result => {
        res.status(200)
    }).catch(() => {
        res.status(500)
    })
})

module.exports = router