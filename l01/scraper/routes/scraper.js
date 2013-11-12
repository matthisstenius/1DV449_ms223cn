var login = require('../models/login'),
	scrape = require('../models/scrape'),
	producersModel = require('../models/producers');

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

			producersModel(result, headers, function(err, html) {
				if (err) {
					console.log(err);
					return;
				}

				//res.render('index', producers);
			});
		});
		
	});
};