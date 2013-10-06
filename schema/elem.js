var mongoose = require('mongoose');

var elemSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Elem', elemSchema);