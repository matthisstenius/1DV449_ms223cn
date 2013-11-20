var db = require('../db.js');

module.exports = function(req, res, next) {
	db.Producer.find({}, function(err, producers) {
		if (err) {
			console.log(err);
			return;
		}
		
		db.NotFound.find({}, function(err, brokenLinks) {
			if (err) {
				console.log(err);
				return;
			}

			res.render('result', {producers: producers, brokenLinks: brokenLinks});
		});
	});
};