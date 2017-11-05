"use strict";
let mongodb = require("mongodb"),
	ObjectId = mongodb.ObjectId,
	DBRef = mongodb.DBRef;
module.exports = ((req, res) => { // 获取代码内容
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
	}).then(res.data).catch(res.catch);
});