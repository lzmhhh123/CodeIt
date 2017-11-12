"use strict";
let mongodb = require("mongodb"),
	ObjectId = mongodb.ObjectId,
	DBRef = mongodb.DBRef;
module.exports = ((req, res) => { // 移除课程
	// console.log(req.session);
	if (!req.session.admin) return res.send({ error_code: 400, error: "not logged in" });
	let _id  = req.body._id;
	req.update("class", { _id: new ObjectId(_id) }, { $set: { disabled: true } })
	.then(res.update).catch(res.catch);
});