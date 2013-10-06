var mongoose = require('mongoose');

var streetSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Street', streetSchema);