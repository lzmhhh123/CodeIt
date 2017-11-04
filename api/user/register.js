"use strict";
module.exports = ((req, res) => { // 用户注册
	let username = req.body.username,
		password = req.body.password,
		email    = req.body.email,
		avatar   = req.body.avatar;
	if (!username || !password || !email || !avatar) return res.send({
		error_code: 400
	});
	req.save("user", {
		username: username,
		password: password,
		email:    email,
		avatar:   avatar
	}).then(r => {
		console.log(r);
		let result = {
			error_code: 200,
			result: r.result
		};
		if (r.ops && r.ops.length) result.op = r.ops[0]._id;
		res.send(result);
	}).catch(ex => res.send({ error_code: 400, error: ex.message }));
});