const path = require("path");

module.exports = {
	historyApiFallback: {
		index: "index.html",
		rewrites: [{ from: /\/establishments/, to: "/establishments.html" }],
	},
	liveReload: true,
	inline: true,
	port: 1337,
	hot: true,
};
