db.class.save({
	_id: ObjectId("59fec9433826153bd1fe56b4"),
	name: "python",
	icon: "1",
	intro: "python is good",
	learners: 0,
	lessons: 0,
	quizzes: 0,
});
db.class.save({
	_id: ObjectId("59fec9433826153bd1fe56b5"),
	name: "c",
	icon: "2",
	intro: "c is powerful",
	learners: 0,
	lessons: 0,
	quizzes: 0,
});
db.class.lesson.save({
	_id: ObjectId("59feca313826153bd1fe56b6"),
	cid: DBRef("class", ObjectId("59fec9433826153bd1fe56b4")),
	order: 0,
	title: "python and string",
	content: "...",
	quizzes: 0
});
db.class.lesson.save({
	_id: ObjectId("59feca553826153bd1fe56b7"),
	cid: DBRef("class", ObjectId("59fec9433826153bd1fe56b4")),
	order: 1,
	title: "python and array",
	content: "...",
	quizzes: 0
});
db.class.quiz.save({
	cid: DBRef("class", ObjectId("59fec9433826153bd1fe56b4")),
	lid: DBRef("class.lesson", ObjectId("59feca313826153bd1fe56b6")),
	content: "...a?",
	anster: "?"
});
db.class.quiz.save({
	cid: DBRef("class", ObjectId("59fec9433826153bd1fe56b4")),
	lid: DBRef("class.lesson", ObjectId("59feca553826153bd1fe56b7")),
	content: "...b?",
	anster: "??"
});
db.user.update({ username: "a" }, { $set: { classes: [ ObjectId("59fec9433826153bd1fe56b4") ] } })