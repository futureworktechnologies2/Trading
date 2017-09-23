var mongoose = require('mongoose');

var stockSchema = new mongoose.Schema({
	title: { type: String, required: '{PATH} is required!'},
	category: { type: String, required: '{PATH} is required!'},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

stockSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Stock', stockSchema);