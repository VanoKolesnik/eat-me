const path = require("path");

const entries = require("./config/entries");
const modules = require("./config/modules");
const plugins = require("./config/plugins");
const devServer = require("./config/devServer");

module.exports = {
	entry: entries,
	output: {
		path: path.join(__dirname, "/build"),
		filename: "./scripts/[name].[hash:8].js",
	},
	resolve: {
		extensions: [".jsx", ".js"],
	},
	module: modules,
	plugins: plugins,
	devServer: devServer,
};
