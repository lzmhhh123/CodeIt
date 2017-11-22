"use strict";
module.exports = ((req, res) => { // 用户自己的代码列表
	// console.log(req.session);
	if (!req.session.user) return res.send({ error_code: 400, error: "not logged in" });
	req.find("code", {
		"author.$id": req.session.user.uid,
		disabled: { $ne: true }
	}, {
		content: false
	}).then(res.find).catch(res.catch);
});