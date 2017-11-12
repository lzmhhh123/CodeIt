"use strict";
module.exports = ((req, res) => { // 用户列表
	// console.log(req.session);
	if (!req.session.admin) return res.send({ error_code: 400, error: "not logged in" });
	req.find("user", {  })
	.then(res.find).catch(res.catch);
});