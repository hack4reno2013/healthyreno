var mongoose = require('mongoose');

var midSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Mid', midSchema);