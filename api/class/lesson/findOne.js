"use strict";
const mongodb = require("mongodb"),
     ObjectId = mongodb.ObjectId,
        DBRef = mongodb.DBRef;
module.exports = ((req, res) => { // 课程章节内容
	// console.log(req.session);
	if (!req.session.user) return res.send({ error_code: 400, error: "not logged in" });
	let _id = req.body._id;
	if (!_id) res.send({ error_code: 400, error: "need _id" });
	req.findOne("class.lesson", { _id: new ObjectId(_id) })
	.then(res.data).catch(res.catch);
});