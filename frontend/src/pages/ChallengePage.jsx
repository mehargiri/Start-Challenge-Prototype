import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetSingleChallenge } from "../query-hooks/challengeQueryHooks";
import {
	useDeleteChoice,
	useGetChoices,
} from "../query-hooks/choicesQueryHooks";

import Button from "../components/Button";

import {
	ChoiceDetails,
	ChoiceForm,
	ChoiceList,
} from "../components/choice/choiceIndex";

export default function ChallengePage() {
	const [openChoiceForm, setOpenChoiceForm] = useState(false);
	const [openChoiceDetails, setOpenChoiceDetails] = useState(false);
	const [choiceId, setChoiceId] = useState(null);
	const [error, setError] = useState("");

	const { challengeId } = useParams();
	const navigate = useNavigate();

	const { data, isError, isLoading, isSuccess } = useGetSingleChallenge(
		challengeId,
		setError
	);

	const {
		data: choiceData,
		isError: isChoiceError,
		isLoading: isChoiceLoading,
		isSuccess: isChoiceSuccess,
	} = useGetChoices(challengeId);

	const { mutate: deleteChoice, isError: isDeleteChoiceError } =
		useDeleteChoice(challengeId, setError);

	return (
		<main className="bg-black h-screen p-20">
			{/* Loading and Error state while fetching a given challenge */}
			{isLoading && (
				<p className="mt-5 text-white text-4xl">Loading the Challenge...</p>
			)}
			{isError && (
				<p className="mt-5 text-white text-4xl">Challenge: {error}</p>
			)}

			{/*  */}
			{isSuccess && (
				<>
					<section className="flex justify-between items-start mb-10">
						<div className="">
							<h1 className="text-white text-5xl">{data.challenge.title}</h1>
							<p className="text-gray-400 text-2xl mt-5">
								{data.challenge.description}
							</p>
							<p className="text-gray-500 text-xl mt-3 mb-5">
								{data.challenge.category}
							</p>
							{openChoiceForm ? (
								<ChoiceForm
									cancelForm={() => setOpenChoiceForm(false)}
									update={openChoiceDetails}
									challengeId={challengeId}
									choiceId={choiceId}
								/>
							) : (
								<Button
									onClick={() => setOpenChoiceForm(true)}
									text={openChoiceDetails ? "Update Choice" : "Add Choice"}
								/>
							)}
						</div>
						{isChoiceLoading && (
							<p className="mt-5 text-white text-4xl">
								Loading the Questions...
							</p>
						)}
						{isChoiceError && (
							<p className="mt-5 text-white text-4xl">Question: {error}</p>
						)}
						{isChoiceSuccess && (
							<section className="mt-5 max-w-3xl">
								<h1 className="text-white text-center text-5xl">Questions</h1>
								<div className="mt-10 flex gap-5 flex-wrap justify-center">
									{choiceData.choices.length === 0 ? (
										<p className="text-white text-2xl">
											No Questions present! Add a Question!
										</p>
									) : (
										choiceData.choices.map((item) => {
											return (
												<ChoiceList
													key={item._id}
													item={item}
													deleteChoice={() => deleteChoice(item._id)}
													setOpenChoiceDetails={() =>
														setOpenChoiceDetails(true)
													}
													setChoiceId={() => setChoiceId(item._id)}
												/>
											);
										})
									)}
								</div>
							</section>
						)}
						<button
							className="text-white text-3xl"
							onClick={() => navigate("/", { replace: true })}
						>
							X
						</button>
					</section>
				</>
			)}
			{isDeleteChoiceError && (
				<p className="mt-5 text-white text-4xl">{error}</p>
			)}
			{isChoiceSuccess &&
				choiceData.choices.length !== 0 &&
				choiceData.choices.map((item) => {
					return (
						<ChoiceDetails
							key={item._id}
							challengeId={challengeId}
							item={item}
							openChoiceDetails={openChoiceDetails}
							setOpenChoiceDetails={() => setOpenChoiceDetails(false)}
							choiceId={choiceId}
							setChoiceId={() => setChoiceId(null)}
						/>
					);
				})}
		</main>
	);
}
