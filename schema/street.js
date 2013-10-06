var mongoose = require('mongoose');

var wardSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Ward', wardSchema);