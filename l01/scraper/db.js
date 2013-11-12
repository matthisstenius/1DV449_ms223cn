var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/scraper');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
	var ProducerSchema = mongoose.Schema({
		producerID: {type: Number},
		name: {type: String},
		city: {type: String},
		website: {type: String},
	});

	module.exports.Producer = mongoose.model('Producer', ProducerSchema);

});