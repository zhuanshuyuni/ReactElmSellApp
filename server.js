var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var express = require('express');
var path = require('path');
var app = express();
var port = 3000;


// 配置路由
var data = require('./data.json');
var seller = data.seller;
var goods = data.goods;
var ratings = data.ratings;

var router = express.Router();

router.get('/seller', function(req, res) {
	res.json({
		"code": 200,
		"data": seller
	});
});
router.get('/goods', function(req, res) {
	res.json({
		"code": 200,
		"data": goods
	});
});
router.get('/ratings', function(req, res) {
	res.json({
		"code": 200,
		"data": ratings
	});
});

app.use('/api', router);



var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(function(req, res) {
	res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, function(error) {
	if (error) {
		console.error(error);
	} else {
		console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
	}
});