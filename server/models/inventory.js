var mongoose = require('mongoose');
// var ObjectId = mongoose.Types.ObjectId;

var inventorySchema = new mongoose.Schema({
	user_id: { type: mongoose.Schema.Types.ObjectId},
	// category_id: { type: mongoose.Schema.Types.ObjectId },
	// stock_id: { type: mongoose.Schema.Types.ObjectId},
	player_id: { type: mongoose.Schema.Types.ObjectId},
	quantity: { type: Number},
	price: { type: Number},
	// description: { type: String},
        // image: { type: String, required: '{PATH} yes I am here is required!'},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

inventorySchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Inventory', inventorySchema);