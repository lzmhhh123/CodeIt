"use strict";
module.exports = ((req, res) => { // 帖子列表
	// console.log(req.session);
	if (!req.session.user) return res.send({ error_code: 400, error: "not logged in" });
	req.find("bulletin", { disabled: { $ne: true } })
	.then(res.find).catch(res.catch);
});