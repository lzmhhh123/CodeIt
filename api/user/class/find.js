"use strict";
module.exports = ((req, res) => { // 用户课程列表
	// console.log(req.session);
	if (!req.session.user) return res.send({ error_code: 400, error: "not logged in" });
	req.findOne("user", { _id: req.session.user.uid }, { classes: true })
	.then(user => {
		return req.find("class", { _id: { $in: user.classes || [] } });
	}).then(res.find).catch(res.catch);
	// res.send({ error_code: 0 });
});