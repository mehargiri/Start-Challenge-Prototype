const express = require("express");
const router = express.Router({ mergeParams: true });

const {
	getAllSolutionsForChoice,
	getSolution,
	createSolutionForChoice,
	updateSolutionForChoice,
	deleteSolution,
} = require("../controllers/solutionController");
router.route("/").get(getAllSolutionsForChoice).post(createSolutionForChoice);
router
	.route("/:solutionId")
	.get(getSolution)
	.patch(updateSolutionForChoice)
	.delete(deleteSolution);

module.exports = router;
