import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useGetSingleChallenge } from "../query-hooks/challengeQueryHooks";
import { useGetChoices } from "../query-hooks/choicesQueryHooks";
import { useGetSolutions } from "../query-hooks/solutionsQueryHooks";

export default function StartChallengePage() {
	const paramObj = useParams();
	const navigate = useNavigate();
	const challengeId = paramObj.challengeId;

	// const [error, setError] = useState("");
	// const [textChallenge, setTextChallenge] = useState("");

	const [choiceListCounter, setChoiceListCounter] = useState(0);

	const [reactionTime, setReactionTime] = useState(null);

	const [picked, setPicked] = useState(false);

	const { data, error, isLoading, isError, isSuccess } =
		useGetSingleChallenge(challengeId);

	const {
		data: choiceList,
		error: choiceListError,
		isLoading: isChoiceListLoading,
		isError: isChoiceListError,
		isSuccess: isChoiceListSuccess,
	} = useGetChoices(challengeId);

	const {
		data: solutionList,
		isLoading: isSolutionListLoading,
		isError: isSolutionListError,
		isSuccess: isSolutionListSuccess,
		dataUpdatedAt: solutionListUpdatedAt,
	} = useGetSolutions(choiceList?.choices[choiceListCounter]?._id);

	const onClickNext = () => {
		const totalListLength = choiceList?.choices.length;
		if (totalListLength !== 0 && choiceListCounter < totalListLength - 1) {
			setChoiceListCounter((prev) => prev + 1);
			setPicked(false);
			setReactionTime(null);
		}
	};

	const onClickPrev = () => {
		const totalListLength = choiceList?.choices.length;
		if (totalListLength !== 0 && !(choiceListCounter < 1)) {
			setChoiceListCounter((prev) => prev - 1);
			setPicked(false);
			setReactionTime(null);
		}
	};

	const goBack = () => {
		navigate(`/`, { replace: true });
	};

	return (
		<main className="h-screen bg-black p-20 flex flex-col items-center gap-8">
			<button
				type="button"
				className="text-white text-4xl text-right w-full absolute right-40"
				onClick={() => goBack()}
			>
				X
			</button>
			{isLoading && (
				<p className="text-white text-4xl">Loading the Challenge...</p>
			)}
			{isError && (
				<p className="text-white text-4xl">Challenge Error: {error.message}</p>
			)}
			{isSuccess && (
				<h1 className="text-white text-5xl">{data.challenge.title}</h1>
			)}

			{isChoiceListLoading && (
				<p className="text-white text-4xl">Loading the Question...</p>
			)}
			{isChoiceListError && (
				<p className="text-white text-4xl">
					Question Error: {choiceListError.message}
				</p>
			)}
			{isChoiceListSuccess && choiceList.choices.length === 0 ? (
				<p className="text-white text-4xl">No Questions available!</p>
			) : (
				<p className="text-white text-3xl">
					{choiceList?.choices[choiceListCounter].question}
				</p>
			)}

			{isSolutionListLoading && (
				<p className="text-white text-4xl">Loading the possible answers...</p>
			)}
			{/* {isSolutionListError && (
				<p className="text-white text-4xl">Answer Error: {error}</p>
			) } */}

			{isChoiceListSuccess &&
				choiceList.choices.length === 0 &&
				isSolutionListError && (
					<p className="text-white text-4xl">No Answers Available</p>
				)}

			{isSolutionListSuccess && solutionList?.solutions.length === 0 ? (
				<p className=" text-white text-4xl">No Answers available!</p>
			) : (
				<div className="mt-10 flex gap-40">
					{solutionList?.solutions.map((item) => {
						return (
							<SolutionTag
								key={item._id}
								item={item}
								start={solutionListUpdatedAt}
								setReactionTime={setReactionTime}
								picked={picked}
								setPicked={setPicked}
							/>
						);
					})}
				</div>
			)}
			{reactionTime !== null && (
				<p className="text-white">{`You answered in ${reactionTime} s`}</p>
			)}

			{isSuccess && isChoiceListSuccess && (
				<div className="mt-5 flex text-white text-xl gap-20">
					<Button text={"Previous"} onClick={onClickPrev} />
					<Button text={"Next"} onClick={onClickNext} />
					{/* <Button text={"Submit"} hide={true} /> */}
				</div>
			)}
		</main>
	);
}

function SolutionTag({ item, start, setReactionTime, picked, setPicked }) {
	const [pickRightAnswer, setPickRightAnswer] = useState(false);
	const [pickWrongAnswer, setPickWrongAnswer] = useState(false);

	// const [alreadyPicked, setAlreadyPicked] = useState(false);

	const onClick = (item) => {
		if (!picked) {
			const end = Date.now();
			const timeTaken = end - start;
			setReactionTime(Math.floor(timeTaken / 1000));
			item.correct ? setPickRightAnswer(true) : setPickWrongAnswer(true);
		}
		setPicked(true);
		// setReactionTime(null);
	};
	return (
		<a
			className={`rounded-lg text-gray-200 text-2xl bg-gray-600 p-3 cursor-pointer hover:scale-110 ${
				pickRightAnswer ? "border-2 border-green-400" : ""
			} ${pickWrongAnswer ? "border-2 border-red-400" : ""}`}
			onClick={() => onClick(item)}
		>
			{item.value}
		</a>
	);
}
