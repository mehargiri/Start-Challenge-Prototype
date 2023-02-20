require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const challengeRouter = require("./routes/challengeRoutes");
const choiceRouter = require("./routes/choiceRoutes");
const solutionRouter = require("./routes/solutionRoutes");

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/error-handler");

app.use(express.json());
app.use("/challenge", challengeRouter);
app.use("/challenge/:challengeId/choice", choiceRouter);
app.use("/choice/:choiceId/solution", solutionRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () => {
			console.log(`Server is listening at port ${port}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
