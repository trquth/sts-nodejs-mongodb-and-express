var mongoose = require('mongoose');

var discountSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    value: {type: Number, require: true, default: 0},
    createdDate: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Discount', discountSchema)