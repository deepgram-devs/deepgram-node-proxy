var httpProxy = require("http-proxy");
var http = require("http");
var fs = require("fs");
var cors = require("cors");

require("dotenv").config();

var port = process.env.PORT ?? 8080;

var proxy = httpProxy.createProxyServer({
  target: {
    protocol: "https:",
    host: "api.deepgram.com",
    port: 443,
    pfx: fs.readFileSync("certificate.p12"),
  },
  changeOrigin: true,
});

proxy.on("proxyReq", function (proxyReq, req, res, options) {
  // rewrite the authorization header with the deepgram API key.
  if (
    proxyReq.getHeader("authorization") &&
    proxyReq.getHeader("authorization").toLowerCase() === "token proxy"
  ) {
    proxyReq.setHeader(
      "authorization",
      `token ${process.env.DEEPGRAM_API_KEY}`
    );
  }
});

var sendError = function (res, err) {
  res.writeHead(500);
  res.write(JSON.stringify({
    error: err,
    message: "An error occured in the proxy",
  }));
  return res.end();
};

// error handling
proxy.on("error", function (err, req, res) {
  sendError(res, err);
});

var corsOptions = {
  origin: process.env.ALLOWED_ORIGIN,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

proxy.on("proxyRes", (proxyRes, req, res) => {
  cors(corsOptions)(req, res, () => {});
});

// a HTTP server to listen for requests to proxy
var server = http.createServer(function (req, res) {
  proxy.web(req, res, { target: "https://api.deepgram.com" });
});

server.on("upgrade", function (req, socket, head) {
  proxy.ws(req, socket, head);
});

console.log(`listening on port ${port}`);
server.listen(port);
