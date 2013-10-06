var http = require('http');
var _ = require ('underscore');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var htmlparser = require("htmlparser2");

var Street = require('./schema/street.js');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	
	var query = Street.find().limit(6);
	//var query = Street.find({name: '8TH ST'});
	
 	query.exec(function (err, streets) {
	  if (err) return handleError(err);
	  _.each(streets, function(street, k) {
		console.log(street);
		_.each(street.parcels, function(parcel, k) {
			console.log(parcel);
 			getParcel(parcel, function(parcel) {
				parseParcel(parcel, function(fields) {
					console.log(fields);
				});	
			});	
		});
	  });
	});
});

function parseParcel(parcel, callback) {
			var table = 0;
			var row = 0;
			//fields
			var fields = {};
			fields.num = 0;
			fields.sub = 0;
			fields.gid = 0;
			fields.spa = 0;
			fields.soi = 0;
			fields.hospital = 0;
			fields.city = 0;
			fields.neighborhood = 0;
			fields.ward = 0;
			fields.zone = 0;
			fields.elem = 0;
			fields.mid = 0;
			fields.high = 0;
			fields.vote = 0;
			fields.zip = 0;
			
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
								fields.num++;
								if(fields.num == 3)
									console.log('Street # ', text.match(/\d+/i)[0])
							break;
							case 4:
								fields.sub++;
								if(fields.sub == 5)
									console.log(text)
							break;
							case 5:
								fields.city++;
								if(fields.city == 3)
									console.log(text);
							break;
							case 6:
								fields.gid++;
								if(fields.gid == 3)
									console.log(text);
							break;
							case 7:
								fields.spa++;
								if(fields.spa == 3)
									console.log(text);
							
							break;
							case 8:
								fields.soi++;
								if(fields.soi == 3)
									console.log(text);
							break;
							case 9:
								fields.neighborhood++;
								if(fields.neighborhood == 3)
									console.log(text);
							break;
							case 10:
								fields.ward++;
								if(fields.ward == 5)
									console.log(text);
							break;
							case 11:
								fields.zone++;
								if(fields.zone == 3)
									console.log(text);
							break;
							case 12:
								fields.elem++;
								if(fields.elem == 3)
									console.log(text);
							break;
							case 13:
								fields.mid++;
								if(fields.mid ==3)
									console.log(text);					
							break;
							case 14:
								fields.high++;
								if(fields.high == 3)
									console.log(text);
							
							break;
							case 15:
								fields.vote++;
								if(fields.vote == 3)
									console.log(text);
							
							break;
							case 16:
								fields.zip++;
								if(fields.zip == 3) {
									console.log(text);
									callback();
								}
							break;
						}
					}
				}
			});
			parser.write(parcel);
			parser.end();
}

var options = {
  host: 'maps.cityofreno.net',
  port: 80
};

function getParcel(parcel, callback) {
	
	//http://maps.cityofreno.net/parceldetails.cfm?searchtype=parcel&searchvalue=518-643-20
	options.path = "/parceldetails.cfm?searchtype=parcel&searchvalue="+parcel+""

	var result = '';
	var req = http.request(options, function(res) {
		res.on('data', function (chunk) {
			result += chunk;
		});
	  
		res.on('end', function(){
			callback(result);
			
		});
	});

	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});

	req.end();
}

function getParcels(street, callback) {
	
	//http://maps.cityofreno.net/stadrsearch.cfm?searchtype=street&searchvalue=ABACUS%20CT
	options.path = "/stadrsearch.cfm?searchtype=street&searchvalue="+querystring.escape(street.name)+""
	
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
