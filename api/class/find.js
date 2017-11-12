"use strict";
module.exports = ((req, res) => { // 课程列表
	// console.log(req.session);
	if (!req.session.user) return res.send({ error_code: 400, error: "not logged in" });
	let name  = req.body.name,
		intro = req.body.intro,
		query = { disabled: { $ne: true } };
	if (name) query.name = new RegExp(name);
	if (intro) query.intro = new RegExp(intro);
	req.find("class", query)
	.then(res.find).catch(res.catch);
});