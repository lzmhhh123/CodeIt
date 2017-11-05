"use strict";
let mongodb = require("mongodb"),
	ObjectId = mongodb.ObjectId,
	DBRef = mongodb.DBRef;
module.exports = ((req, res) => { // 获取帖子内容
	// console.log(req.session);
	if (!req.session.user) return res.send({ error_code: 400, error: "not logged in" });
	let _id = req.body._id;
	if (!_id) return res.send({ error_code: 400, error: "need _id" });
	req.findOne("bulletin", {
		_id: new ObjectId(_id)
	}).then(res.data).catch(res.catch);
});