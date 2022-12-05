const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
	app.use(
		"/together",
		createProxyMiddleware({
			target: "http://220.66.115.155:80",
			changeOrigin: true,
		})
	)
}