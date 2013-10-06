var mongoose = require('mongoose');

var streetSchema = mongoose.Schema({
    name: String,
	parcels: Array
});

module.exports = mongoose.model('Street', streetSchema);