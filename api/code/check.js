"use strict";
const http = require("http");
let mongodb = require("mongodb"),
	ObjectId = mongodb.ObjectId,
	DBRef = mongodb.DBRef;
module.exports = ((req, res) => { // 运行代码
	// console.log(req.session);
	if (!req.session.user) return res.send({ error_code: 400, error: "not logged in" });
	let _id = req.body._id;
	if (!_id) return res.send({ error_code: 400, error: "need _id" });
	req.findOne("code", {
		_id: new ObjectId(_id),
		$or: [ // 公开或者作者是自己
			{ public: true },
			{ "author.$id": req.session.user.uid }
		]
	}).then(code => {
		let data = {
			source: code.content,
			lang: codes[code.type],
			testcases: '[ "test" ]',
			api_key: "hackerrank|3226685-2041|d95d9a5a83819bcf089268e0a3055ad961c1e72e",
			wait: true,
			format: "json"
		}, temp = [], byteLength;
		for (let k in data) {
			temp.push(k + "=" + encodeURIComponent(data[k]));
		}
		temp = temp.join("&");
		// console.log(temp);
		byteLength = Buffer.byteLength(temp);
		let _req = http.request({
			hostname: "api.hackerrank.com",
			path: "/checker/submission.json",
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Content-Length": byteLength,
				"Expect": "100-continue"
			}
		}, _res => {
			// console.log("res");
			let temp = [],
				length = 0;
			_res.on("data", chunk => {
				// console.log("data", chunk.length);
				temp.push(chunk);
				length += chunk.length;
			});
			_res.on("end", chunk => {
				if (chunk instanceof Buffer) {
					temp.push(chunk);
					length += chunk.length;
				}
				let data = Buffer.concat(temp, length);
				// console.log("end", temp, length, data.length);
				data = data.toString("utf-8");
				data = JSON.parse(data);
				// console.log(data);
				res.send({ error_code: 0, data: data.result });
			});
		});
		_req.write(temp);
		_req.end();
	}).catch(res.catch);
});

const codes = {
	"c":1,
	"cpp":2,
	"java":3,
	"python":5,
	"perl":6,
	"php":7,
	"ruby":8,
	"csharp":9,
	"mysql":10,
	"oracle":11,
	"haskell":12,
	"clojure":13,
	"bash":14,
	"scala":15,
	"erlang":16,
	"lua":18,
	"javascript":20,
	"go":21,
	"d":22,
	"ocaml":23,
	"r":24,
	"pascal":25,
	"sbcl":26,
	"python3":30,
	"groovy":31,
	"objectivec":32,
	"fsharp":33,
	"cobol":36,
	"visualbasic":37,
	"lolcode":38,
	"smalltalk":39,
	"tcl":40,
	"whitespace":41,
	"tsql":42,
	"java8":43,
	"db2":44,
	"octave":46,
	"xquery":48,
	"racket":49,
	"rust":50,
	"swift":51,
	"fortran":54
};
