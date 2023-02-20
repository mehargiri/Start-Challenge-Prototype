const ChoiceSchema = require("../models/Choice");
const ChallengeSchema = require("../models/Challenge");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/errorIndex");
const mongoose = require("mongoose");

const getAllChoicesForChallenge = async (req, res) => {
	const { challengeId } = req.params;
	const choices = await ChoiceSchema.find({ challengeId: challengeId });
	return res.status(StatusCodes.OK).json({ choices, count: choices.length });
};

const getChoice = async (req, res) => {
	const { choiceId } = req.params;
	const choice = await ChoiceSchema.findOne({ _id: choiceId });
	if (!choice) {
		throw new NotFoundError(`No choice found with id ${choiceId}`);
	}
	return res.status(StatusCodes.OK).json({ choice });
};

const createChoiceForChallenge = async (req, res) => {
	const { challengeId } = req.params;
	// console.log(req.body);
	// console.log(req.params);
	const { question } = req.body;

	if (question === "") {
		throw new BadRequestError("Value cannot be empty");
	}
	const choice = await ChoiceSchema.create({
		challengeId: challengeId,
		question: question,
	});
	// console.log(choice);
	// const challenge = await ChallengeSchema.findOne({ _id: challengeId });
	// console.log(challenge);
	// challenge.addChoice(choice);
	return res.status(StatusCodes.CREATED).json({ choice });
};

const updateChoiceForChallenge = async (req, res) => {
	const { choiceId, challengeId } = req.params;
	const { question } = req.body;
	if (question === "") {
		throw new BadRequestError("Value cannot be empty");
	}

	const updateChoice = await ChoiceSchema.findOneAndUpdate(
		{ challengeId: challengeId, _id: choiceId },
		req.body,
		{ new: true, runValidators: true }
	);

	if (!updateChoice) {
		throw new NotFoundError(`No choice exists with id ${choiceId}`);
	}
	// const challenge = await ChallengeSchema.findOne({ _id: challengeId });
	// challenge.updateChoice(updateChoice);

	return res.status(StatusCodes.OK).json({ updateChoice });
};

const deleteChoice = async (req, res) => {
	const { choiceId, challengeId } = req.params;
	const deleteChoice = await ChoiceSchema.findOneAndRemove({
		_id: choiceId,
		challengeId: challengeId,
	});

	if (!deleteChoice) {
		throw new NotFoundError(`No choice exists with id ${choiceId}`);
	}
	// const challenge = await ChallengeSchema.findOne({ _id: challengeId });
	// challenge.removeChoice(deleteChoice);
	res.status(StatusCodes.OK).send();
};

module.exports = {
	getAllChoicesForChallenge,
	getChoice,
	createChoiceForChallenge,
	updateChoiceForChallenge,
	deleteChoice,
};
