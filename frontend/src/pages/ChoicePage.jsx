import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetSingleChoice } from "../query-hooks/choicesQueryHooks";
import {
	useDeleteSolution,
	useGetSolutions,
} from "../query-hooks/solutionsQueryHooks";

import Button from "../components/Button";

import {
	SolutionDetails,
	SolutionForm,
	SolutionList,
} from "../components/solution/solutionIndex";

export default function ChoicePage() {
	const [openSolutionForm, setOpenSolutionForm] = useState(false);
	const [openSolutionDetails, setSolutionDetails] = useState(false);
	const [solutionId, setSolutionId] = useState(null);
	const [error, setError] = useState("");

	const { challengeId, choiceId } = useParams();
	const navigate = useNavigate();

	const { data, isError, isLoading, isSuccess } = useGetSingleChoice(
		challengeId,
		choiceId,
		setError
	);

	const {
		data: solutionData,
		isError: isSolutionError,
		isLoading: isSolutionLoading,
		isSuccess: isSolutionSuccess,
	} = useGetSolutions(choiceId);

	const { mutate: deleteSolution, isError: isDeleteSolutionError } =
		useDeleteSolution(choiceId, setError);

	return (
		<main className="bg-black h-screen p-20">
			{isLoading && (
				<p className="mt-5 text-white text-4xl">Loading the Choice...</p>
			)}
			{isError && <p className="mt-5 text-white text-4xl">Choice: {error}</p>}
			{isSuccess && (
				<>
					<section className="flex justify-between items-start">
						<div className="mb-5">
							{/* <p className="text-white text-4xl mb-5"> Current Choice</p> */}
							<h1 className="text-white text-3xl w-[25rem]">
								{data.choice.question}
							</h1>
						</div>
						{isSolutionLoading && (
							<p className="mt-5 text-white text-4xl">
								Loading the Solutions...
							</p>
						)}
						{isSolutionError && (
							<p className="mt-5 text-white text-4xl">Solution: {error}</p>
						)}
						{isSolutionSuccess && (
							<section className="mt-5">
								<h1 className="text-white text-center text-5xl">Solutions</h1>
								<div className="flex gap-24 mt-10 max-w-6xl m-auto">
									{solutionData.solutions.length === 0 ? (
										<p className="text-white text-4xl">
											No Solutions present! Add a Solution!
										</p>
									) : (
										solutionData.solutions.map((item) => {
											return (
												<SolutionList
													key={item._id}
													item={item}
													deleteSolution={() => deleteSolution(item._id)}
													setSolutionDetails={() => setSolutionDetails(true)}
													setSolutionId={() => setSolutionId(item._id)}
												/>
											);
										})
									)}
								</div>
							</section>
						)}
						<button
							className="text-white text-3xl"
							onClick={() =>
								navigate(`/challenge/${challengeId}`, { replace: true })
							}
						>
							X
						</button>
					</section>
				</>
			)}
			{isDeleteSolutionError && (
				<p className="mt-5 text-white text-4xl">{error}</p>
			)}
			{openSolutionForm ? (
				<SolutionForm
					cancelForm={() => setOpenSolutionForm(false)}
					update={openSolutionDetails}
					choiceId={choiceId}
					solutionId={solutionId}
				/>
			) : (
				<Button
					onClick={() => setOpenSolutionForm(true)}
					text={openSolutionDetails ? "Update Solution" : "Add Solution"}
				/>
			)}
			{isSolutionSuccess &&
				solutionData.solutions.length !== 0 &&
				solutionData.solutions.map((item) => {
					return (
						<SolutionDetails
							key={item._id}
							challengeId={choiceId}
							item={item}
							openSolutionDetails={openSolutionDetails}
							setSolutionDetails={() => setSolutionDetails(false)}
							solutionId={solutionId}
							setSolutionId={() => setSolutionId(null)}
						/>
					);
				})}
		</main>
	);
}
