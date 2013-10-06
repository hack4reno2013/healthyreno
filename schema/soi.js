var mongoose = require('mongoose');

var soiSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Soi', soiSchema);