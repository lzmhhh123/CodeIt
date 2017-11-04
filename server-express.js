"use strict";
let cluster = require("cluster"),
	Daemon = require("daemon");
if (cluster.isMaster) {
	require("log-prefix")(() => `[${new Date().toLocaleString()}]`);
	let argv = require("yargs")
		.option("url", {
			demand: true,
			describe: "mongodb url",
            type: "string",
            default: "mongodb://localhost/codeit"
		}).option("port", {
			demand: true,
			describe: "listening port",
            type: "number",
            default: 80
		}).argv;
	let url = argv.url,
		port = argv.port;
	console.log("url: \x1b[1;34m" + url + "\x1b[m, port: \x1b[1;34m" + port + "\x1b[m");
	let num = require("os").cpus().length;
	cluster.settings.args = [];
	for (let i = 0; i < num; i++) {
		let worker = cluster.fork({
			url: url,
			port: port
		});
		worker.on("exit", (code, signal) => {
			if (signal) {
				console.log(`worker was killed by signal: ${signal}`);
			} else if (code) {
				console.log(`worker exited with error code: ${code}`);
			} else {
				console.log(`worker succeed`);
			}
		});
	}
} else if (cluster.isWorker) {
	let worker = cluster.worker;
	require("log-prefix")(() => `[${new Date().toLocaleString()} #${worker.id}])`);
	console.log(`worker #${worker.id}(${worker.process.pid}) online.`);
	let url = process.env.url,
		port = process.env.port;
	let express     = require("express"),
		bodyParser  = require("body-parser"),
		cookieParser= require("cookie-parser"),
		session     = require("express-session"),
		serveStatic = require('serve-static');
	let app    = express(),
		daemon = new Daemon(url),
		conf   = {};
	app.use(bodyParser.json({ limit: "50mb" }));
	app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
	app.use(cookieParser());
	app.use(serveStatic(__dirname + "/webroot"));
	app.use(daemon.mongodb());
	// app.use(daemon.session());
	app.use("/api", (req, res, next) => {
		let origin = req.header("Origin");
		if (origin === "http://runapi.showdoc.cc") { // runapi.showdoc.cc
		res.header("Access-Control-Allow-Origin", "http://runapi.showdoc.cc");
			res.header("Access-Control-Allow-Credentials", "true");
		}
		next();
	});
	app.use("/api", daemon.CGI("api", conf));
	app.listen(port, function() {
		console.log("app.listen(" + port + ")");
	});
	process.on('uncaughtException', err => {
		console.error('Error caught in uncaughtException event:', err);
		console.log(err.stack);
	});
}
