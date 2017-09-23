var mongoose = require('mongoose');

var countrySchema = new mongoose.Schema({
	country_code: { type: String},
	country_name: { type: String},
});

countrySchema.pre('save', function(next){
  // now = new Date();
  // this.updated_at = now;
  next();
});

module.exports = mongoose.model('Country', countrySchema);