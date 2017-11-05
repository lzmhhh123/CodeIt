"use strict";
module.exports = ((req, res) => { // 更新用户资料
	// console.log(req.session);
	if (!req.session.user) return res.send({ error_code: 400, error: "not logged in" });
	let username = req.body.username,
		password = req.body.password,
		email    = req.body.email,
		avatar   = req.body.avatar;
	if (!username || !password) return res.send({ error_code: 400, error: "need username & password" });
	req.update("user", {
		_id: req.session.user.uid,
		username: username,
		password: password,
		disabled: false
	}, { $set: {
		email: email,
		avatar: avatar,
		modified: new Date()
	}}).then(res.update).catch(res.catch);
});