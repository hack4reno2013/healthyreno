var mongoose = require('mongoose');

var zoneSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Zone', zoneSchema);