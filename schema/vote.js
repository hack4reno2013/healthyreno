var mongoose = require('mongoose');

var voteSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Vote', voteSchema);