var cheerio = require('cheerio'),
	request = require('request'),
	db = require('../db.js');

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

	var counter = 0;
	
	/**
	 * @param  {[Object]} producer
	 */
	addProducer(function(producer) {
		counter++;
		db.Producer.create({
			producerID: producer.producerID,
			name: producer.name,
			city: producer.city,
			website: producer.website
		}, function(err) {
			if (err) {
				callback(err);
				return;
			}
		});

		if (counter === producerLinks.length - 1) {
			callback(null);
		}
	});
};