var mongoose = require('mongoose');

var zipSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Zip', zipSchema);