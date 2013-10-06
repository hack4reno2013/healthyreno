var mongoose = require('mongoose');

var spaSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Spa', spaSchema);