"use strict";
module.exports = ((req, res) => { // 用户注册
	let username = req.body.username,
		password = req.body.password,
		email    = req.body.email,
		avatar   = req.body.avatar;
	if (!username || !password || !email || !avatar) return res.send({
		error_code: 400
	});
	let now = new Date();
	// db.user.ensureIndex({ usename: 1 }, { unique: true })
	req.save("user", {
		username: username,
		password: password,
		email:    email,
		avatar:   avatar,
		created:  now,
		modified: now,
		disabled: false
	}).then(r => {
		let result = {
			error_code: 0,
			result: r.result
		};
		if (r.ops && r.ops.length) result.op = r.ops[0]._id;
		res.send(result);
	}).catch(ex => res.send({ error_code: 400, error: ex.message }));
});