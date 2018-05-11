const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, 'uploads/categories/')
    },
    filename: (req, file, callback) => {
        callback(null,`${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
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

router.post('/', upload.single('category_image'), (req, res, next) => {
    var category = new Category({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        imagePath: req.file.path
    })

    category.save().then(result => {
        res.status(200).json({
            isSuccess: true
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router