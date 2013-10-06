var mongoose = require('mongoose');

var citySchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('city', citySchema);