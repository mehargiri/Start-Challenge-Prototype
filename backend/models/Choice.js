const mongoose = require("mongoose");

const ChoiceSchema = new mongoose.Schema({
	challengeId: {
		type: mongoose.Types.ObjectId,
		ref: "Challenge",
		required: [true, "please provide challenge Id for this choice"],
	},
	question: {
		type: String,
		required: [true, "Please provide the value for the question"],
		trim: true,
	},
	reactionTime: {
		type: Number,
		default: 0,
	},
	solutions: [],
});

// ChoiceSchema.methods.saveReactionTime = (userReactionTime) => {
// 	this.reactionTime = userReactionTime;
// };

// ChoiceSchema.methods.addSolution = (inputSolution) => {
// 	if (this.solutions.length !== 0) {
// 		if (
// 			this.solutions.some((item) => item._id === inputSolution._id) === false
// 		) {
// 			this.solutions.push(inputSolution);
// 		}
// 	} else {
// 		this.solutions.push(inputSolution);
// 	}
// };

// ChoiceSchema.methods.updateSolution = (inputSolution) => {
// 	if (this.solutions.some((item) => item._id === inputSolution._id)) {
// 		const index = this.solutions.findIndex(
// 			(item) => item._id === inputSolution._id
// 		);
// 		this.solutions[index] = { ...inputSolution };
// 	}
// };

// ChoiceSchema.methods.removeSolution = (inputSolution) => {
// 	if (this.solutions.length !== 0) {
// 		const filteredChoices = this.solutions.filter(
// 			(item) => item._id !== inputSolution._id
// 		);
// 		this.solutions = filteredChoices;
// 	}
// };

module.exports = mongoose.model("Choice", ChoiceSchema);
