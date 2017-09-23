var mongoose = require('mongoose');

var positionSchema = new mongoose.Schema({
	title: { type: String, required: '{PATH} is required!'},
	// category: { type: mongoose.Schema.Types.ObjectId, required: '{PATH} is required!'},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

positionSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Position', positionSchema);