const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

let ExtractTextPlugin = require("extract-text-webpack-plugin");
let packageInfo = require('./package.json');

// GLOBALS
let GlobalPlugin = new webpack.DefinePlugin({
	__DEBUG__: process.env.NODE_ENV !== "production",
	__VERSION__: JSON.stringify(packageInfo.version)
});

module.exports = {
	context: path.join(__dirname, "src"),
	entry: [
		'./index.js'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/dist/'
	},
	module: {
		//loaders加载器
		loaders: [{
			test: /\.(js|jsx)$/, //一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
			exclude: /node_modules/, //屏蔽不需要处理的文件（文件夹）（可选）
			loader: 'babel-loader', //loader的名称（必须）
			query: {
				presets: ['es2015', 'react']
			},
			include: __dirname
		}, {
			test: /\.json?$/,
			loader: 'json'
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.less/,
			loader: 'style-loader!css-loader!less-loader'
		}, {
			test: /\.(png|jpg|gif)$/,
			loader: 'url-loader?limit=8192'
		}, {
			test: /\.styl/,
			loader: 'stylus-loader!css-loader'
		}, {
			test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url-loader?limit=10000&mimetype=application/font-woff'
		}, {
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
		}, {
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file-loader'
		}, {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url-loader?limit=10000&mimetype=image/svg+xml"
		}]
	},
	resolve: {
		extensions: ['.js', '.css'] //  require('./a') => require('./a.js')
	},
	plugins: [
		new ExtractTextPlugin("style.css", {
			allChunks: true
		}),
		GlobalPlugin,
		new HtmlWebpackPlugin({
			template: './index.html', // 模版文件
			inject: 'body',
			filename: 'index.html'
		})
	]
}