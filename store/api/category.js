const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, '/uploads/category')
    },
    filename: (req, file, callback) => {
        callback(null, new Date().toISOString() + file.originalname)
    }
})

const upload = multer({
    storage: storage
})

const Category = require('../models/category');

router.post('/', upload.single('productImage'), (req, res, next) => {
    var category = new Category({
        _id: mongoose.Schema.Types.ObjectId(),
        name: req.body.name
    })

    category.save().then(result => {
        res.status(200)
    }).catch(() => {
        res.status(500)
    })
})

module.exports = router