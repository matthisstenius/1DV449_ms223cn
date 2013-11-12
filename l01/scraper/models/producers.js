var cheerio = require('cheerio'),
	request = require('request');

module.exports = function(data, headers, callback) {
	var $ = cheerio.load(data);

	var producers = [];

	var producerNames = $('td a');
	var url = 'http://vhost3.lnu.se:20080/~1dv449/scrape/secure/';

	var sessionCookie = headers['set-cookie'][1].split(';', 1);
	
	var cookie = request.cookie(sessionCookie[0]);
	
	var jar = request.jar();
	jar.add(cookie);


	function addProducer(callback) {
		for (var i = 0; i < producerNames.length; i++) {		
		(function(i) {
			request({url: url +  $(producerNames[i]).attr('href'), jar: jar}, function(err, res, body) {
				if (res.statusCode == 200) {
					var $ = cheerio.load(body);
					
					var producer = {
						name: $('h1').text(),
						city: $('.ort').text(),
						website: $('a[href^="http://www"]').attr('href')
					};
					
					callback(producer);
				}
			});	
		})(i);
	}
	}

	addProducer(function(producers) {
		console.log(producers);
	});
};