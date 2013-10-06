var mongoose = require('mongoose');

var highSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('High', highSchema);