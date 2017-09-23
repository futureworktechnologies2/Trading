var mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
	title: { type: String, required: '{PATH} is required!'},
	club: { type: mongoose.Schema.Types.ObjectId, required: '{PATH} is required!'},
	position: { type: mongoose.Schema.Types.ObjectId},
	position_side: { type: String},
	birth_date: { type: String},
	birth_place: { type: String},
	preferred_foot: { type: String},
	weight: { type: String},
	height: { type: String},
	shirt_number: { type: Number},
	country: { type: String},
	category: { type: mongoose.Schema.Types.ObjectId},
	player_image: { type: String },
	buy: { type: Number, required: '{PATH} is required!' },
	sell: { type: Number, required: '{PATH} is required!' },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

playerSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Player', playerSchema);