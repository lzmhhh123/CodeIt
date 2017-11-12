"use strict";
module.exports = ((req, res) => { // 代码列表
	// console.log(req.session);
	if (!req.session.admin) return res.send({ error_code: 400, error: "not logged in" });
	req.find("code", {  })
	.then(res.find).catch(res.catch);
});