const mongoose = require("mongoose");

const ChallengeSchema = new mongoose.Schema({
	category: {
		type: String,
		enum: {
			values: ["true/false", "MCQ", "fill in blank"],
			message: "{VALUE} is not supported",
		},
	},
	title: {
		type: String,
		required: [true, "Please provide the challenge title"],
	},
	description: {
		type: String,
		default: "",
	},
	completed: {
		type: String,
		enum: ["pending", "completed"],
		default: "pending",
	},
	choices: [],
});

// ChallengeSchema.methods.addChoice = (inputChoice) => {
// 	if (this.choices.length !== 0) {
// 		if (this.choices.some((item) => item._id === inputChoice._id) === false) {
// 			this.choices.push(inputChoice);
// 		}
// 	} else {
// 		this.choices.push(inputChoice);
// 	}
// };

// ChallengeSchema.methods.updateChoice = (inputChoice) => {
// 	if (this.choices.some((item) => item._id === inputChoice._id)) {
// 		const index = this.choices.findIndex(
// 			(item) => item._id === inputChoice._id
// 		);
// 		this.choices[index] = { ...inputChoice };
// 	}
// };

// ChallengeSchema.methods.removeChoice = (inputChoice) => {
// 	if (this.choices.length !== 0) {
// 		const filteredChoices = this.choices.filter(
// 			(item) => item._id !== inputChoice._id
// 		);
// 		this.choices = filteredChoices;
// 	}
// };

module.exports = mongoose.model("Challenge", ChallengeSchema);
