var loginModel = require('../models/login'),
	linkModel = require('../models/link'),
	producersModel = require('../models/producers');

exports.scrape = function(req, res) {
	loginModel(function login(err, headers) {
		if (err) {
			console.log(err.message);
			return;
		}

		linkModel(headers, function getLinks(err, result) {
			if (err) {
				console.log(err);
				return;
			}

			producersModel(result, headers, function addProducers(err) {
				if (err) {
					console.log(err);
					return;
				}

				res.redirect('result');
			});
		});
		
	});
};