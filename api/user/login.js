"use strict";
module.exports = ((req, res) => { // 用户登入
	// console.log(req.cookies);
	let username = req.body.username,
		password = req.body.password;
	if (!username || !password) return res.send({
		error_code: 400
	});
	req.findOne("user", {
		username: username,
		password: password
	}, { password: false }).then(u => {
		if (!u) return Promise.reject({ message: "user not found" });
		if (u.disabled) return Promise.reject({ message: "user disabled" });
		let now = new Date();
		let user = req.session.user;
		if (user && user.created)
			req.session.user = {
				uid: u._id,
				created: user.created,
				updated: now,
				disabled: false
			};
		else
			req.session.user = {
				uid: u._id,
				created: now,
				updated: now,
				disabled: false
			};
		res.send({ error_code: 0, uid: u._id });
	}).catch(res.catch);
});