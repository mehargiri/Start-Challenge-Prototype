const express = require("express");
const router = express.Router({ mergeParams: true });
const {
	getAllChallenges,
	getChallenge,
	createChallenge,
	updateChallenge,
	deleteChallenge,
} = require("../controllers/challengeController");

router.route("/").get(getAllChallenges).post(createChallenge);
router
	.route("/:challengeId")
	.get(getChallenge)
	.patch(updateChallenge)
	.delete(deleteChallenge);

module.exports = router;
