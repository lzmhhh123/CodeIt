"use strict";
const mongodb = require("mongodb"),
     ObjectId = mongodb.ObjectId,
        DBRef = mongodb.DBRef;
module.exports = ((req, res) => { // 课程测试列表
	// console.log(req.session);
	if (!req.session.user) return res.send({ error_code: 400, error: "not logged in" });
	let cid   = req.body.cid,
		lid   = req.body.lid,
		query = {};
	if (cid) query["cid.$id"] = new ObjectId(cid);
	if (lid) query["lid.$id"] = new ObjectId(lid);
	req.find("class.quiz", query)
	.then(res.find).catch(res.catch);
});