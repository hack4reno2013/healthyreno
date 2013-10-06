var mongoose = require('mongoose');

var subSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Sub', subSchema);