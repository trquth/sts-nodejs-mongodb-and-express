const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');

const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, 'uploads/products/')
    },
    filename: (req, file, callback) => {
        callback(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
    }
})

const fileFilter = (req, file, callback) => {
    file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ? callback(null, true) : callback(new Error('The file type is incorrectly'), false)

}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
})

const Category = require('../models/category');
const Product = require('./../models/product');
const ProductImage = require('./../models/product-image');

router.post('/', upload.array('product_images', 5), (req, res, next) => {

    var product = new Product({
        _id: mongoose.Schema.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating,
        description: req.body.description,
        No: req.body.No,
        thumbnailImage: req.files.length > 0 ? req.files[0].path : '',
    })

    product.save().then(result => {
        for (let index = 1; index < req.files.length; index++) {
            let productImage = ProductImage({
                _id: mongoose.Types.ObjectId(),
                productId: result._id,
                patch: req.files[index].path,
            })
            productImage.save()
        }
        res.status(200)
    }).catch(() => {
        res.status(500)
    })
})

module.exports = router