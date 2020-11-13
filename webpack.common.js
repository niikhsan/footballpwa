const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const copyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: "./src/js/main.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js"
	},

	mode: "production",
	module: {
		rules: [
		{
			test: /\.css$/,
			use:[
			{
				loader:"style-loader"
			},
			{
				loader:"css-loader"
			}
			]
		},
		]
	},
		//plugin
		plugins: [
		//html webpack plugin
			new HtmlWebpackPlugin({
				template: "./index.html",
				filename: "index.html"
			}),
			new copyPlugin({
				patterns: [
					{ from: 'fonts', to:'./fonts'},
					{ from: 'iconfont', to:'./iconfont'},
					{ from: 'materialize', to:'./materialize'},
					{ from: 'src', to:'./src'},
					{ from: 'package-lock.json', to: './'},
					{ from: 'package.json', to: './' },
					{ from: 'webpack.common.js', to: './'},
					{ from: 'webpack.dev.js', to: './'},
					{ from: 'webpack.prod.js', to: './'},
					{ from: 'manifest.json', to: './'},
					{ from: 'index.html', to: './'},
					{ from: 'favicon.ico', to:'./'},
					{ from: 'icon.png', to:'./'},
					{ from: 'icon192.png', to: './'},
					{ from: 'icon512.png', to: './'}
				]
			})
		]
	}