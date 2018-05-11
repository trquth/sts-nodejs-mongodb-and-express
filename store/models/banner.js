var mongoose = require('mongoose');

var bannerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    imagePath: {type: String, require: true},
    description: {type: String},
    No: {type: Number, default: 0},
    createdDate: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Banner', bannerSchema)