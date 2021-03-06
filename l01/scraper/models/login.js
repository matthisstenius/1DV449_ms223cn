var cheerio = require('cheerio'),
	request = require('request');

/**
 * Posts login credentials to http://vhost3.lnu.se:20080/~1dv449/scrape/check.php
 * @param  {Function} callback
 */
module.exports = function(callback) {
	var url = 'http://vhost3.lnu.se:20080/~1dv449/scrape/check.php';

	var options = {
		url: url,
		form: {
			username: 'admin', 
			password: 'admin'
		}
	};

	request.post(options, function(error, response, body) {
		if (error) {
			callback(error);
		}
		
		callback(null, response.headers);
	});
};