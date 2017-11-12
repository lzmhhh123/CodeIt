"use strict";
module.exports = ((req, res) => { // 管理员登入
	// console.log(req.cookies);
	let username = req.body.username,
		password = req.body.password;
	if (!username || !password) return res.send({
		error_code: 400
	});
	req.findOne("admin", {
		username: username,
		password: password
	}, { password: false }).then(admin => {
		if (!admin) return Promise.reject({ message: "admin not found" });
		if (admin.disabled) return Promise.reject({ message: "admin disabled" });
		let now = new Date();
		let admin = req.session.admin;
		if (admin && admin.created)
			req.session.admin = {
				admin: admin._id,
				created: admin.created,
				updated: now,
				disabled: false
			};
		else
			req.session.admin = {
				admin: admin._id,
				created: now,
				updated: now,
				disabled: false
			};
		res.send({ error_code: 0, admin: admin._id });
	}).catch(res.catch);
});