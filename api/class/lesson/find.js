"use strict";
const mongodb = require("mongodb"),
     ObjectId = mongodb.ObjectId,
        DBRef = mongodb.DBRef;
module.exports = ((req, res) => { // 课程章节列表
	// console.log(req.session);
	if (!req.session.user) return res.send({ error_code: 400, error: "not logged in" });
	let cid     = req.body.cid,
		title   = req.body.title,
		// content = req.body.content,
		query   = {};
	if (cid) query["cid.$id"] = new ObjectId(cid);
	if (title) query.title = new RegExp(title);
	// if (content) query.content = new RegExp(content);
	req.find("class.lesson", query, { content: false})
	.then(res.find).catch(res.catch);
});