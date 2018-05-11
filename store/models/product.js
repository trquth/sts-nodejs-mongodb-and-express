var mongoo = require('mongoose');

var productSchema = mongoo.Schema({
    _id: mongoo.Schema.Types.ObjectId,
    name: {type: String, require: true},
    price: {type: Number, require: true},
    rating: {type: Number, default: 0},
    description: {type: String},
    No: {type: Number, default: 0},
    thumbnailImage: {type: String},
    images: [{type: mongoo.Schema.Types.ObjectId, ref: "ProductImage"}],
    discount: {type: mongoo.Schema.Types.ObjectId, ref: "Discount"},
    createdDate: {type: Date, default: Date.now}
})

module.exports = mongoo.model("Product", productSchema)