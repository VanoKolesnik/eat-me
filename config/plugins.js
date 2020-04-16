const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
	new HtmlWebpackPlugin({
		template: "./source/public/index.html",
		filename: "./index.html",
		chunks: ["common", "index"],
	}),
	new HtmlWebpackPlugin({
		template: "./source/public/establishments.html",
		filename: "./establishments.html",
		chunks: ["common", "establishments"],
	}),
];
