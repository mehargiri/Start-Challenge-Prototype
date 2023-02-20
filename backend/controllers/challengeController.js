const ChallengeSchema = require("../models/Challenge");
const ChoiceSchema = require("../models/Choice");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/errorIndex");

const getAllChallenges = async (req, res) => {
	const challenges = await ChallengeSchema.find({});
	return res
		.status(StatusCodes.OK)
		.json({ challenges, count: challenges.length });
};

const createChallenge = async (req, res) => {
	const { category, title, description = "" } = req.body;
	if (title === "") {
		throw new BadRequestError("Title cannot be empty ");
	}
	const challenge = await ChallengeSchema.create({
		category: category,
		title: title,
		description: description,
	});
	return res.status(StatusCodes.CREATED).json({ challenge });
};

const getChallenge = async (req, res) => {
	const { challengeId } = req.params;
	const challenge = await ChallengeSchema.findOne({ _id: challengeId });
	if (!challenge) {
		throw new NotFoundError(`No challenge found with id ${challengeId}`);
	}
	return res.status(StatusCodes.OK).json({ challenge });
};

const updateChallenge = async (req, res) => {
	const { challengeId } = req.params;
	const { category = "", title, description = "" } = req.body;
	if (title === "") {
		throw new BadRequestError("title cannot be empty ");
	}
	// const request = { category: category, title: title };
	// if (description) request.description = description;
	// if (tags) request.tags = tags;

	const updateChallenge = await ChallengeSchema.findOneAndUpdate(
		{
			_id: challengeId,
		},
		req.body,
		{ new: true, runValidators: true }
	);

	if (!updateChallenge) {
		throw new NotFoundError(`No challenge exist with id ${challengeId}`);
	}
	return res.status(StatusCodes.OK).json({ updateChallenge });
};

const deleteChallenge = async (req, res) => {
	const { challengeId } = req.params;
	const deleteChallenge = await ChallengeSchema.findOneAndRemove({
		_id: challengeId,
	});

	if (!deleteChallenge) {
		throw new NotFoundError(`No challenge exist with id ${challengeId}`);
	}
	res.status(StatusCodes.OK).send();
};

module.exports = {
	getAllChallenges,
	getChallenge,
	createChallenge,
	updateChallenge,
	deleteChallenge,
};
