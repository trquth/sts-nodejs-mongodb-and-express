var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, require: true},
    icon: {type: String},
    createdDate: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Category', categorySchema)