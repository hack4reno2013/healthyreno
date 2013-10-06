var mongoose = require('mongoose');

var nbSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Nb', nbSchema);