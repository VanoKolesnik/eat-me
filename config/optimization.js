const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
	minimizer: [new UglifyJsPlugin()],
	splitChunks: {
		chunks: "all",
	},
	runtimeChunk: true,
};
