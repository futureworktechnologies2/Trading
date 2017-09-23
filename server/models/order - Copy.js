var mongoose = require('mongoose');
var orderSchema = new mongoose.Schema({
	player_id: { type: mongoose.Schema.Types.ObjectId, required: '{PATH} is required!'},
	user_id: { type: mongoose.Schema.Types.ObjectId, required: '{PATH} is required!'},
	side: { type: String, required: '{PATH} is required!'},
	price: { type: Number, required: '{PATH} is required!'},
	quantity: { type: Number, required: '{PATH} is required!'},
	role: { type: String, default: "user" },
	sort_order: { type: Number, default: 0 },
	is_delete: { type: String },
	// buyer_id: { type: String },
	// seller_id: { type: String },
	// stock_id: { type: String },
	// price: { type: String },
	// quantity: { type: Number },
	// order_type: { type: String },
	// is_delete: { type: String },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

  // console.log(orderSchema);
orderSchema.pre('save', function(next){
  now = new Date();
  // console.log("user_id");
  // var dd = now.toString().split("-");
  // console.log(dd[0]);
  // console.log(dd);
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Order', orderSchema);