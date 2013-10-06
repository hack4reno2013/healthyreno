var mongoose = require('mongoose');

var gidSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Gid', gidSchema);