var mongoose = require('mongoose');
// var multer  = require('multer');
// var mkdirp = require('mkdirp');

var categorySchema = new mongoose.Schema({
	title: { type: String, required: '{PATH} is required!'},
	description: { type: String, required: '{PATH} is required!'},
        image: { type: String},
        // image: { type: String, required: '{PATH} yes I am here is required!'},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

categorySchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Category', categorySchema);