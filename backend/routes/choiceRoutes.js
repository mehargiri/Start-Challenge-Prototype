const express = require("express");
const router = express.Router({ mergeParams: true });

const {
	getAllChoicesForChallenge,
	getChoice,
	createChoiceForChallenge,
	updateChoiceForChallenge,
	deleteChoice,
} = require("../controllers/choiceController");

router.route("/").get(getAllChoicesForChallenge).post(createChoiceForChallenge);

router
	.route("/:choiceId")
	.get(getChoice)
	.patch(updateChoiceForChallenge)
	.delete(deleteChoice);

module.exports = router;
