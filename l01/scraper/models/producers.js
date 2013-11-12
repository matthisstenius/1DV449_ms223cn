var cheerio = require('cheerio'),
	request = require('request');

/**
 * [Scrapes producer pages]
 * @param  String   data     producers links HTML
 * @param  Array  headers  array of headers
 * @param  {Function} callback
 */
module.exports = function(data, headers, callback) {
	var $ = cheerio.load(data);

	var producerLinks = $('td a');
	var baseUrl = 'http://vhost3.lnu.se:20080/~1dv449/scrape/secure/';

	var sessionCookie = headers['set-cookie'][1].split(';', 1);
	
	var sessionCookie = request.cookie(sessionCookie[0]);
	
	var jar = request.jar();
	jar.add(sessionCookie);


	/**
	 * Formats producer data
	 * @param {Function} callback
	 */
	function addProducer(callback) {
		for (var i = 0; i < producerLinks.length; i++) {		
			(function(i) {
				request({url: baseUrl +  $(producerLinks[i]).attr('href'), jar: jar}, function(err, res, body) {
					if (res.statusCode === 200) {
						var $ = cheerio.load(body);
						
						var producerID = $(producerLinks[i]).attr('href').replace(/[^0-9]*/g, '');
						var city = $('.ort').text().replace(/.*:\s/, '');
						
						callback({
							producerID: producerID,
							name: $('h1').text(),
							city: city,
							website: $('a[href^="http://www"]').attr('href')
						});
					}
				});	
			})(i);
		}
	};

	/**
	 * @param  {[Object]} producer
	 */
	addProducer(function(producer) {
		//@todo add to db
		console.log(producer);
	});
};