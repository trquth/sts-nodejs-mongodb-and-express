const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParse = require('body-parser');
const categoryRouters = require('./store/api/category');
const productRouters = require('./store/api/product');
const discountRouters = require('./store/api/discount');

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParse.urlencoded({extended: false}));
//app.use(bodyParse.urlencoded());
app.use(bodyParse.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/category', categoryRouters);
app.use('/product', productRouters);
app.use('/discount', discountRouters);

mongoose.connect('mongodb://localhost/store');

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app