const mongoose = require("mongoose");

const SolutionSchema = new mongoose.Schema({
	choiceId: {
		type: mongoose.Types.ObjectId,
		ref: "Choice",
		required: [true, "Please provide question id"],
	},
	value: {
		type: String,
		trim: true,
		required: [true, "Please provide a value for solution"],
	},
	correct: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model("Solution", SolutionSchema);
