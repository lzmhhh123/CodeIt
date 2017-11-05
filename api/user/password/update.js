"use strict";
module.exports = ((req, res) => { // 更新用户密码
	// console.log(req.session);
	if (!req.session.user) return res.send({ error_code: 400, error: "not logged in" });
	let username = req.body.username,
		password = req.body.password,
		newPass  = req.body.newPass;
	if (!username || !password) return res.send({ error_code: 400, error: "need username & password" });
	if (!newPass) return res.send({ error_code: 400, error: "need new password" });
	req.update("user", {
		_id: req.session.user.uid,
		username: username,
		password: password,
		disabled: false
	}, { $set: {
		password: newPass,
		modified: new Date()
	}}).then(res.update).catch(res.catch); // TODO 清除对应用户的session
});