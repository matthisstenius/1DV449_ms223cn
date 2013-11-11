var cheerio = require('cheerio'),
	http = require('http');

module.exports = function(url, callback) {
	http.get('http://vhost3.lnu.se:20080/~1dv449/scrape/', function(res) {
	  	var data = '';

	  	res.on('data', function(chunk) {
	  		data += chunk;
	  	});

	  	res.on('end', function() {
	  		callback(null, data);
	  	});

	  	res.on('error', function(err) {
	  		callback(err);
	  	});
  });
};