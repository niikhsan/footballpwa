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
					{ from: 'pushServer.js', to:'./'},
					{ from: 'sw.js', to:'./'},
					{ from: 'webpack.common.js', to: './'},
					{ from: 'webpack.dev.js', to: './'},
					{ from: 'webpack.prod.js', to: './'},
					{ from: 'manifest.json', to: './'},
					{ from: 'index.html', to: './'},
					{ from: 'favicon.ico', to:'./'},
					{ from: 'icon.png', to:'./'},
					{ from: 'icon192.png', to: './'},
					{ from: 'icon512.png', to: './'}
					// { from: './fonts/font-awesome.css', to: '/dist' },
					// { from: './fonts/FontAwesome.otf', to: '/dist' },
					// { from: './fonts/fontawesome-webfont.eot', to: '/dist' },
					// { from: './fonts/fontawesome-webfont.svg', to: '/dist' },
					// { from: './fonts/fontawesome-webfont.ttf', to: '/dist' },
					// { from: './fonts/fontawesome-webfont.woff', to: '/dist' },
					// { from: './fonts/fontawesome-webfont.woff2', to: '/dist' },
					// { from: './iconfont/material-icons.css', to: '/dist' },
					// { from: './iconfont/MaterialIcons-Regular.eot', to: '/dist'},
					// { from: './iconfont/MaterialIcons-Regular.woff2', to: '/dist'},
					// { from: './iconfont/MaterialIcons-Regular.woff', to: '/dist'},
					// { from: './iconfont/MaterialIcons-Regular.ttf', to: '/dist'},
					// { from: './iconfont/MaterialIcons-Regular.svg', to: '/dist'},
					// { from: './materialize/css/materialize.min.css', to: '/dist'},
					// { from: './materialize/js/materialize.min.js', to: '/dist'},
					// { from: './src/pages/bookmark.html', to: '/dist'},
					// { from: './src/pages/home.html', to: '/dist' },
					// { from: './src/pages/nav.html', to: '/dist' },
					// { from: './src/pages/team.html', to: '/dist' },
					// { from: './src/css/style.css', to: '/dist' },
					// { from: './src/js/idb.js', to: '/dist' },
					// { from: './src/js/main.js', to: '/dist' },
					// { from: './src/js/sw-register.js', to: '/dist' },
					// { from: './src/js/modules/api.js', to: '/dist' },
					// { from: './src/js/modules/database.js', to: '/dist' },
					// { from: './src/js/modules/listener.js', to: '/dist'},
					// { from: './src/js/modules/nav.js', to: '/dist'},
					// { from: './src/js/modules/page.js', to: '/dist'},
					// { from: './package-lock.json', to: '/dist'},
					// { from: './package.json', to: '/dist' },
					// { from: './webpack.common.js', to: '/dist'},
					// { from: './webpack.dev.js', to: '/dist'},
					// { from: './webpack.prod.js', to: '/dist'},
					// { from: './manifest.json', to: '/dist'},
					// { from: './index.html', to: '/dist'},
					// { from: './favicon.ico', to:'/dist'},
					// { from: './icon.png', to:'/dist'},
					// { from: './icon192.png', to: '/dist'},
					// { from: './icon512.png', to: '/dist'}
				]
			})
		]
	}