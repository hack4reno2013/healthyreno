var mongoose = require('mongoose');

var parcelSchema = mongoose.Schema({
    ID: String,
	street:  mongoose.Schema.Types.ObjectId,
	num: String,
	sub: String,
	gid: String,
	spa: String,
	soi: String,
	city: String,
	neighborhood: String,
	ward: String,
	zone: String,
	elem: String,
	mid: String,
	high: String,
	vote: String,
	zip: String
});

module.exports = mongoose.model('Parcel', parcelSchema);