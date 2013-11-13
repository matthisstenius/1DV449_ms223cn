
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var scraper = require('./routes/scraper');
var result = require('./routes/result');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

hbs = handlebars.create({
	defaultLayout: 'main',
	partialsDir: 'views',
	layoutsDir: 'views/layout'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/result', result);
app.get('/scrape', scraper.scrape);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
