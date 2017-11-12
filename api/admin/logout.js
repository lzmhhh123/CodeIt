"use strict";
module.exports = ((req, res) => { // 用户登出
	// console.log(req.session);
	if (!req.session.admin) return res.send({ error_code: 400, error: "not logged in" });
	delete req.session.admin;
	res.send({ error_code: 0 });
});