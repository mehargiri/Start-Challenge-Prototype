const SolutionSchema = require("../models/Solution");
const ChoiceSchema = require("../models/Choice");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/errorIndex");
const getAllSolutionsForChoice = async (req, res) => {
	const { choiceId } = req.params;
	const solutions = await SolutionSchema.find({ choiceId: choiceId });
	// if (solutions.length > 1) {
	// 	solutions.forEach((item) => item.saveRenderedDate(Date.now()));
	// } else {
	// 	solutions.saveRenderedDate(Date.now());
	// }
	return res
		.status(StatusCodes.OK)
		.json({ solutions, count: solutions.length });
};

const getSolution = async (req, res) => {
	const { solutionId, choiceId } = req.params;
	const solution = await SolutionSchema.findOne({
		_id: solutionId,
		choiceId: choiceId,
	});
	if (!solution) {
		throw new NotFoundError(`No solution found with id ${solutionId}`);
	}
	return res.status(StatusCodes.OK).json({ solution });
};

const createSolutionForChoice = async (req, res) => {
	const { choiceId } = req.params;
	const { value, correct } = req.body;

	if (value === "") {
		throw new BadRequestError("Value cannot be empty");
	}

	const boolCorrect = correct === "true" ? true : false;
	const solution = await SolutionSchema.create({
		choiceId: choiceId,
		value: value,
		correct: boolCorrect,
	});
	// const choice = await ChoiceSchema.findOne({ _id: choiceId });
	// choice.addSolution(solution);
	return res.status(StatusCodes.CREATED).json({ solution });
};

const updateSolutionForChoice = async (req, res) => {
	const { choiceId, solutionId } = req.params;
	const { value } = req.body;

	if (value === "") {
		throw new BadRequestError("Value cannot be empty");
	}

	const boolCorrect = correct === "true" ? true : false;
	const updateSolution = await SolutionSchema.findOneAndUpdate(
		{ choiceId: choiceId, _id: solutionId },
		{ value: value, correct: boolCorrect },
		{ new: true, runValidators: true }
	);

	if (!updateSolution) {
		throw new NotFoundError(`No solution exists with id ${solutionId}`);
	}
	// const choice = await ChoiceSchema.findOne({
	// 	_id: choiceId,
	// });
	// choice.updateSolution(updateSolution);
	return res.status(StatusCodes.OK).json({ updateSolution });
};

// const updateSolutionSubmitDateForChoice = async (req, res) => {
// 	const { choice, solution } = req.params;
// 	req.body.submitTime = Date.now();
// 	const updateSolution = await SolutionSchema.findByIdAndUpdate(
// 		{ _id: solution, choiceId: choice },
// 		req.body,
// 		{ new: true, runValidators: true }
// 	);
// 	// Not found error

// 	return res.status(StatusCodes.OK).json({ updateSolution });
// };

const deleteSolution = async (req, res) => {
	const { choiceId, solutionId } = req.params;
	const deleteSolution = await SolutionSchema.findOneAndRemove({
		_id: solutionId,
		choiceId: choiceId,
	});

	if (!deleteSolution) {
		throw new NotFoundError(`No solution exists with id ${solutionId}`);
	}
	// const choice = await ChoiceSchema.findOne({
	// 	_id: choiceId,
	// });
	// choice.removeSolution(deleteSolution);
	res.status(StatusCodes.OK).send();
};

module.exports = {
	getAllSolutionsForChoice,
	getSolution,
	createSolutionForChoice,
	updateSolutionForChoice,
	// updateSolutionSubmitDateForChoice,
	deleteSolution,
};
