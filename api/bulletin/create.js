"use strict";
let mongodb = require("mongodb"),
	ObjectId = mongodb.ObjectId,
	DBRef = mongodb.DBRef;
module.exports = ((req, res) => { // 发表/回复帖子
	// console.log(req.session);
	if (!req.session.user) return res.send({ error_code: 400, error: "not logged in" });
	let title    = req.body.title,
		content  = req.body.content,
		tags     = req.body.tags,
		reply_to = req.body.reply_to;
	if (!title || !content) return res.send({ error_code: 400, error: "need title & content" });
	if (!reply_to) { // 发表帖子
		return req.findOne("user", {
			_id: ObjectId(req.session.user.uid)
		}).then(u => {
			if (u.disabled) return Promise.reject({ message: "user disabled" });
			return req.save("bulletin", { // 保存帖子
				title: title,
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
				modified: null,
				replied: null
			})
		}).then(res.update).catch(res.catch);
	}
	// 回复帖子
	return req.findOne("user", {
		_id: ObjectId(req.session.user.uid)
	}).then(u => {
		if (u.disabled) return Promise.reject({ message: "user disabled" });
		return req.findOne("bulletin", { _id: new ObjectId(reply_to)}); 
	}).then(b => {
		if (!b || b.disabled) return Promise.reject({ message: "cannot reply" });
		let now = new Date();
		return Promise.all([
			req.save("bulletin", { // 保存回帖
				title: title,
				content: content,
				tags: tags,
				author: new DBRef("user", req.session.user.uid),
				vote: {
					up: 0,
					down: 0,
					heat: 0,
					value: 0
				},
				replies: 0,
				heat: 0,
				created: now,
				modified: null,
				replied: null
			}),
			req.update("bulletin", { _id: b._id }, { // 更新主贴
				$set: { replied: now },
				$inc: { replies: 1 }
			})
		]);
	}).spread(res.update).catch(res.catch);
});