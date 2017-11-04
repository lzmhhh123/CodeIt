"use strict";
module.exports = ((req, res) => { // 用户登入
	let username = req.body.username,
		password = req.body.password;
	if (!username || !password) return res.send({
		error_code: 400
	});
	req.findOne("user", {
		username: username,
		password: password
	}, { password: 0 }).then(u => {
		if (!u) return Promise.reject({ message: "user not found" });
		let now = new Date();
		req.session.user = {
			uid: u._id,
			created: now,
			updated: now,
			disabled: false
		};
		res.send({ error_code: 0, uid: u._id });
	}).catch(ex => res.send({ error_code: 400, error: ex.message }));
});