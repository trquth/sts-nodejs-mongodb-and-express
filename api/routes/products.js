const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/')
    },
    filename: (req, file, callback) => {
        callback(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, callback) => {
    file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ? callback(null, true) : callback(new Error('The file type is incorrectly'), false)

}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter : fileFilter
})

const Product = require('./../models/product')

router.get('/', (req, res, next) => {
    Product.find()
        .select('name price productImage')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                  return {
                    name: doc.name,
                    price: doc.price,
                    productImage: doc.productImage,
                    _id: doc._id,
                    request: {
                      type: "GET",
                      url: "http://localhost:3000/products/" + doc._id
                    }
                  };
                })
              };
              //   if (docs.length >= 0) {
              res.status(200).json(response);
              //   } else {
              //       res.status(404).json({
              //           message: 'No entries found'
              //       });
              //   }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.post('/', upload.single('productImage'), (req, res, next) => {
    console.log('IMAGE', req.file)
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    })
    product.save().then(result => {
        console.log('RESULT--->', result)
        res.status(201).json({
            message: 'Handling POST requests to /products',
            data: product
        })
    }).catch(err => {
        console.log('ERROR---->', err)
        res.status(500).json({
            error: err
        })
    })

})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId

    Product.findById(id)
        .exec()
        .then(doc => {
            doc ? res.status(200).json(doc) : res.status(404).json({
                message: "No valid entry found for provided ID"
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.patch('/:productId', (req, res, next) => {

    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json('result')
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router