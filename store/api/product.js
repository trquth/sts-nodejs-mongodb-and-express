const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
var connection = mongoose.connection;

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
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating,
        description: req.body.description,
        No: req.body.No,
        thumbnailImage: req.files.length > 0 ? req.files[0].path : '',
        category: req.body.categoryId,
        discount: req.body.discountId,
    })

    product.save().then(result => {
        for (let index = 1; index < req.files.length; index++) {
            let productImage = ProductImage({
                _id: mongoose.Types.ObjectId(),
                patch: req.files[index].path,
            })

            productImage.save().then(image => {
                Product.findById(result.id).then(product => {
                    product.images.push(image.id)

                    product.save()
                })
            })
        }
        res.status(200).json({
            isSuccess: true
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.get('/', (req, res, next) => {
    // Product.find().then(data =>
    //     res.status(200).json({
    //         data: data
    //     })).catch(err => {
    //         res.status(500).json({
    //             error: err
    //         })
    //     })
    
    connection.db.collection("orders", function (err, collection) {
        collection.aggregate([
            {
                $lookup:
                    {
                        from: "warehouses",
                        let: { order_item: "$item", order_qty: "$ordered" },
                        pipeline: [
                            {
                                $match:
                                    {
                                        $expr:
                                            {
                                                $and:
                                                    [
                                                        { $eq: ["$stock_item", "$$order_item"] },
                                                        { $gte: ["$instock", "$$order_qty"] }
                                                    ]
                                            }
                                    }
                            },
                            { $project: { stock_item: 0, _id: 0 } }
                        ],
                        as: "stockdata"
                    }
            }
        ]).toArray(function (err, data) {
             res.status(200).json({
                 data : data
             })
        })

    });
})

module.exports = router