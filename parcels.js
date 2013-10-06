var http = require('http');
var _ = require ('underscore');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var htmlparser = require("htmlparser2");
var querystring = require('querystring');

var Street = require('./schema/street.js');
var Parcel = require('./schema/parcel.js');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	
	//retrieveParcel();
	
	populateParcels(function(){
		normalizeParcels();
	});
	
	

});

function retrieveParcel() {
	var query = Parcel.find({num: '322', name: 'CLAY ST'});
	query.exec(function (err, parcel) {
		if (err) return handleError(err);
		
		console.log(parcel);
	});
	
}

function normalizeParcels() {
	console.log('done');
/* 
	var query = Street.find({name: 'CLAY ST'});
	
 	query.exec(function (err, streets) {
	  if (err) return handleError(err);
	  _.each(streets, function(street, k) {
			_.each(street.parcels, function(id, k) {
				var query2 = Parcel.find({ID: id});
				query2.exec(function (err, parcel) {
					if (err) return handleError(err);
					street.parcels[k] = mongoose.Types.ObjectId(parcel._id);
					street.markModified('parcels');
					street.save(function(err, p) {
						console.log(p);
					});
				});
			});
		});
	}); */
}

function populateParcels(callback) {

	var query = Street.find().limit(10);
	var l = 0;
	var c = -1;
	
 	query.exec(function (err, streets) {
	  if (err) return handleError(err);
	  l = streets.length;
	  _.each(streets, function(street, k) {
		getParcels(street.name, function(parcels){
			_.each(parcels, function(id, k) {
				getParcel(id, function(parcel) {
					parseParcel(parcel, function(fields) {
						var p = new Parcel();
						p.ID = fields.id;
						p.street = fields.street.val;
						p.num = fields.num.val;
						p.sub = fields.sub.val;
						p.gid = fields.gid.val;
						p.spa = fields.spa.val;
						p.soi = fields.soi.val;
						p.city = fields.city.val;
						p.neighborhood = fields.neighborhood.val;
						p.ward = fields.ward.val;
						p.zone = fields.zone.val;
						p.elem = fields.elem.val;
						p.mid = fields.mid.val;
						p.high = fields.high.val;
						p.vote = fields.vote.val;
						p.zip = fields.zip.val;
							
						p.save(function(err, p){
							console.log(p);
							c++;
							if(l == c)
								callback();
						});
					});
				});
			});
		});
	  });
	});
}

function parseParcel(parcel, callback) {

			var table = 0;
			var row = 0;
			//fields
			var fields = {};
			fields.id = parcel.id;
			
			fields.num = {};
			fields.num.count = 0;
			fields.num.val = '';
			
			fields.street = {};
			fields.street.count = 0;
			fields.street.val = '';
			
			fields.sub = {};
			fields.sub.count = 0;
			fields.sub.val = '';
			
			fields.gid = {};
			fields.gid.count = 0;
			fields.gid.val = '';
			
			fields.spa = {};
			fields.spa.count = 0;
			fields.spa.val = '';
			
			fields.soi = {};
			fields.soi.count = 0;
			fields.soi.val = '';
			
			fields.city = {};
			fields.city.count = 0;
			fields.city.val = '';
			
			fields.neighborhood = {};
			fields.neighborhood.count = 0;
			fields.city.val = '';
			
			fields.ward = {};
			fields.ward.count = 0;
			fields.ward.val = '';
			
			fields.zone = {};
			fields.zone.count = 0;
			fields.zone.val = '';
			
			fields.elem = {};
			fields.elem.count = 0;
			fields.elem.val = '';
			
			fields.mid = {};
			fields.mid.count = 0;
			fields.mid.val = '';
			
			fields.high = {};
			fields.high.count = 0;
			fields.high.val = '';
			
			fields.vote = {};
			fields.vote.count = 0;
			fields.vote.val = '';
			
			fields.zip = {};
			fields.zip.count = 0;
			fields.zip.val = '';
			
			var parser = new htmlparser.Parser({
				onopentag: function(name, attribs){
					if(name == 'table')
						table++;
						
					if(name=='tr')
						row++;
						
				},
				ontext: function(text){
					
					if(table == 1) {
						switch(row) {
							case 3:
								fields.num.count++;
								if(fields.num.count == 3) {
									var t = text.match(/\d+/i);
									var s = text.match(/[^ \d+].*/);
									
									if(!_.isNull(t)) {
										fields.num.val = t[0];
										fields.street.val = s[0];
									}
									
								}
							break;
							case 4:
								fields.sub.count++;

								if(fields.sub.count == 5) {
									fields.sub.val = text;
								}
							break;
							case 5:
								fields.city.count++;
								if(fields.city.count == 3)
									fields.city.val = text;
							break;
							case 6:
								fields.gid.count++;
								if(fields.gid.count == 3)
									fields.gid.val = text;
							break;
							case 7:
								fields.spa.count++;
								if(fields.spa.count == 3)
									fields.spa.val = text;
							
							break;
							case 8:
								fields.soi.count++;
								if(fields.soi.count == 3)
									fields.soi.val = text;
							break;
							case 9:
								fields.neighborhood.count++;
								if(fields.neighborhood.count == 3)
									fields.neighborhood.val = text;
							break;
							case 10:
								fields.ward.count++;
								if(fields.ward.count == 5) {
									if(text == '\r\n   \t    ') {
										fields.ward.val = 'N/A';
									}else{
										fields.ward.val = text;
									}
								}
							break;
							case 11:
								fields.zone.count++;
								if(fields.zone.count == 3)
									fields.zone.val = text;
							break;
							case 12:
								fields.elem.count++;
								if(fields.elem.count == 3)
									fields.elem.val = text;
							break;
							case 13:
								fields.mid.count++;
								if(fields.mid.count == 3)
									fields.mid.val = text;				
							break;
							case 14:
								fields.high.count++;
								if(fields.high.count == 3)
									fields.high.val = text;
							
							break;
							case 15:
								fields.vote.count++;
								if(fields.vote.count == 3)
									fields.vote.val = text;
							
							break;
							case 16:
								fields.zip.count++;
								if(fields.zip.count == 3) {
									fields.zip.val = parseInt(text);
									
										var query = Street.findOne({name: fields.street.val});
										query.exec(function (err, street) {
											if (err) return handleError(err);
											fields.street.val = street;
											callback(fields);
										});
									
								}
							break;
						}
					}
				}
			});
			parser.write(parcel.data);
			parser.end();
}

var options = {
  host: 'maps.cityofreno.net',
  port: 80
};

function getParcel(id, callback) {
	
	//http://maps.cityofreno.net/parceldetails.cfm?searchtype=parcel&searchvalue=518-643-20
	options.path = "/parceldetails.cfm?searchtype=parcel&searchvalue="+id+"";

	var parcel = {};
	parcel.id = id;
	parcel.data = '';
	
	var req = http.request(options, function(res) {
		res.on('data', function (chunk) {
			parcel.data += chunk;
		});
	  
		res.on('end', function(){
			callback(parcel);
		});
	});

	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});

	req.end();
}

function getParcels(street, callback) {
	
	//http://maps.cityofreno.net/stadrsearch.cfm?searchtype=street&searchvalue=ABACUS%20CT
	options.path = "/stadrsearch.cfm?searchtype=street&searchvalue="+querystring.escape(street)+"";
	
	var result = '';
	var req = http.request(options, function(res) {
		res.on('data', function (chunk) {
			result += chunk;
		});
	  
		res.on('end', function(){
			callback(result.match(/\d{3}-\d{3}-\d{2}/g));
		});
	});

	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});

	req.end();
}
