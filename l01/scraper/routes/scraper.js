var scrapeModel = require('../models/scrape');

exports.scrape = function(req, res) {
	var url = 'http://vhost3.lnu.se:20080/~1dv449/scrape/';

	scrapeModel(url, function(err, result) {
		if (err) {
			console.log(err);
			return;
		}

		console.log(result);
	});
};