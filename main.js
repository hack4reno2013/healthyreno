var http = require('http');
var _ = require ('underscore');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Street = require('./schema/street.js');
var Sub = require('./schema/sub.js');
var GID = require('./schema/gid.js');
var SPA = require('./schema/spa.js');
var SOI = require('./schema/soi.js');
var City = require('./schema/city.js');
var NB = require('./schema/nb.js');
var ward = require('./schema/ward.js');
var Zone = require('./schema/zone.js');
var Elem = require('./schema/elem.js');
var Mid = require('./schema/mid.js');
var High = require('./schema/high.js');
var Vote = require('./schema/vote.js');
var Zip = require('./schema/zip.js');
var Parcel = require('./schema/parcel.js');

/* var query = Parcel.distinct('zip');
query.exec(function (err, parcel) {
	if (err) return handleError(err);
	
	_.each(parcel, function(v,k) { 
		console.log(v + ',');
		
		if(k == parcel.length -1)
			process.exit(0);
	});
}); */

