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
					{ from: 'src/pages/nav.html', to: '/dist' },
				]
			})
		]
	}