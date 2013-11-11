var login = require('../models/login'),
	scrape = require('../models/scrape');

exports.scrape = function(req, res) {
	login(function(err, headers) {
		if (err) {
			console.log(err.message);
			return;
		}

		scrape(headers, function(err, result) {
			if (err) {
				console.log(err);
				return;
			}

			console.log(result);
		});
		
	});
};