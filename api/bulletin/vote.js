"use strict";
let mongodb = require("mongodb"),
	ObjectId = mongodb.ObjectId,
	DBRef = mongodb.DBRef;
module.exports = ((req, res) => { // 赞或踩一篇帖子
	// console.log(req.session);
	if (!req.session.user) return res.send({ error_code: 400, error: "not logged in" });
	let _id  = req.body._id,
		vote = req.body.vote;
	let up = 0, down = 0, heat = 0, value = 0;
	if (!_id) return res.send({ error_code: 400, error: "need _id" });
	switch (vote) {
		default:
			return res.send({ error_code: 400, error: "invalid vote" });
		case "up":
			up = heat = value = 1;
			break;
		case "down":
			down = heat = 1;
			value = -1
			break;
	};
	req.update("bulletin", {
		_id: new ObjectId(_id),
		disabled: { $ne: true }
	}, {
		$set: { voted: new Date()},
		$inc: {
			"vote.up": up,
			"vote.down": down,
			"vote.heat": heat,
			"vote.value": value,
		}
	}).then(res.update).catch(res.catch);
});