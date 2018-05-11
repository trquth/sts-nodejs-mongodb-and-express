const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Discount = require('../models/discount');

router.post('/', (req, res, next) => {
    var discount = new Discount({
        _id: mongoose.Types.ObjectId(),
        value: req.body.value,
    })

    discount.save().then(result => {
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