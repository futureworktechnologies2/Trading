var mongoose = require('mongoose');
// var ObjectId = mongoose.Types.ObjectId;

var paymentSchema = new mongoose.Schema({
	user_id: { type: mongoose.Schema.Types.ObjectId},
	token: { type: String},
	amount: { type: Number},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

paymentSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Payment', paymentSchema);