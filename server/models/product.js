/*var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: String,
    sku: String,
    price: Number
});

productSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

// module.exports = mongoose.model('Category', categorySchema);
module.exports = mongoose.model('Products', productSchema);*/


// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var productSchema = new mongoose.Schema({
    name: String,
    sku: String,
    price: Number
});

// Return model
module.exports = restful.model('Products', productSchema);