"use strict";
module.exports = ((req, res) => { // 课程列表
	// console.log(req.session);
	if (!req.session.admin) return res.send({ error_code: 400, error: "not logged in" });
	req.find("class", {  })
	.then(res.find).catch(res.catch);
});