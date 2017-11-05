"use strict";
module.exports = ((req, res) => { // 用户登出
	// console.log(req.session);
	if (!req.session.user) return res.send({ error_code: 400, error: "not logged in" });
	req.findOne("user", {
		_id: req.session.user.uid,
		disabled: false
	}, { password: false }).then(res.data).catch(res.catch);
});