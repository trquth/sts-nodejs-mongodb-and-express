var mongoose = require('mongoose');

var productImageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    patch: {type: String, require: true},
    createdDate: {type: Date, default: Date.now}
})

module.exports = mongoose.model('ProductImage', productImageSchema)