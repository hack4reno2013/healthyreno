var http = require('http');
var _ = require ('underscore');
var Regex = require('regex');
var querystring = require('querystring');
var fs = require('fs');
var csv = require('csv');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Street = require('./schema/street.js');

function getStreets(callback) {
	fs.readFile("csv/streets.csv", "utf-8", function(err, data) {
		csv()
		.from.string(data
		)
		.to.array( function(data){
			_.each(data[0], function(v,k) {
				var street = new Street({ name: v });
				street.save();
				if(k == data[0].length - 1)
					callback();
			});
		});
	});
}

getStreets(function(){
	console.log('done');
});


//http://maps.cityofreno.net/stadrsearch.cfm?searchtype=street&searchvalue=ABACUS%20CT