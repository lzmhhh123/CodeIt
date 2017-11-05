"use strict";
let mongodb = require("mongodb"),
	ObjectId = mongodb.ObjectId,
	DBRef = mongodb.DBRef;
module.exports = ((req, res) => { // 保存代码
	// console.log(req.session);
	if (!req.session.user) return res.send({ error_code: 400, error: "not logged in" });
	let _public   = req.body.public,
		title    = req.body.title,
		type     = req.body.type,
		content  = req.body.content,
		tags     = req.body.tags;
	if (!_public || !title || !type || !content) return res.send({ error_code: 400, error: "need public & title & type & content" });
	req.findOne("user", {
		_id: ObjectId(req.session.user.uid)
	}).then(u => {
		if (u.disabled) return Promise.reject({ message: "user disabled" });
		return req.save("code", { // 保存代码
			public: _public === "true",
			title: title,
			type: type,
			content: content,
			tags: tags,
			author: new DBRef("user", u._id),
			vote: {
				up: 0,
				down: 0,
				heat: 0,
				value: 0
			},
			replies: 0,
			// heat: 0,
			created: new Date(),
			modified: null
		})
	}).then(res.update).catch(res.catch);
});