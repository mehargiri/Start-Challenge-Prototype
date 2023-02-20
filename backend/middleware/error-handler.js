const { StatusCodes } = require("http-status-codes");
const errorHandler = (error, req, res, next) => {
	let ownError = {
		statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: error.message || "Something went wrong, try again later",
	};
	// if (error instanceof CustomError) {
	// 	return res.status(error.statusCode).json({ msg: error.message });
	// }
	if (error.name === "ValidationError") {
		ownError.msg = Object.values(error.errors)
			.map((item) => item.message)
			.join(", ");
		ownError.statusCode = 400;
	}
	if (error.code && error.code === 11000) {
		ownError.msg = `Duplicate value entered for ${Object.keys(
			error.keyValue
		)} field, please provide another value`;
		ownError.statusCode = 400;
	}
	if (error.name === "CastError") {
		ownError.msg = `No item found with id: ${error.value}`;
		ownError.statusCode = 404;
	}
	return res.status(ownError.statusCode).json({ msg: ownError.msg });
	// return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
};

module.exports = errorHandler;
