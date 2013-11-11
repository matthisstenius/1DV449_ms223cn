var request = require('request');

/**
 * Scrapes http://vhost3.lnu.se:20080/~1dv449/scrape/secure/producenter.php
 * @param  {array}   headers  HTTP headers
 * @param  {function} callback
 */
module.exports = function(headers, callback) {
	var url = 'http://vhost3.lnu.se:20080/~1dv449/scrape/secure/producenter.php';

	var sessionCookie = headers['set-cookie'][1].split(';', 1);
	
	var jar = request.jar();
	var cookie = request.cookie(sessionCookie[0]);
	jar.add(cookie);
	
	var options = {
		url: url,
		jar: jar
	};

	request(options, function(err, res, body) {
		if (err) {
			callback(err);
		}

		if (res.statusCode != 200) {
			callback(new Error('Could not fetch data ', res.statusCode));
		}

		callback(body);
	});
};