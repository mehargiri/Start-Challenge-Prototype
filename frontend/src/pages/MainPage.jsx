import { useState } from "react";

import {
	useGetChallenges,
	useDeleteChallenge,
} from "../query-hooks/challengeQueryHooks";

import Button from "../components/Button";

import {
	ChallengeDetails,
	ChallengeForm,
	ChallengeList,
} from "../components/challenge/challengeIndex";
import { Link } from "react-router-dom";

export default function MainPage() {
	const [form, setForm] = useState(false);
	const [openDetails, setOpenDetails] = useState({
		state: false,
		title: "",
		description: "",
		category: "",
	});
	const [id, setId] = useState(null);
	const [deleteError, setDeleteError] = useState("");

	const { data, error, isLoading, isError, isSuccess } = useGetChallenges();

	const { mutate: deleteChallenge, isError: isDeleteError } =
		useDeleteChallenge(setDeleteError);

	return (
		<main className="bg-black h-screen p-20">
			{form ? (
				<ChallengeForm
					cancelForm={() => setForm(false)}
					update={openDetails}
					id={id}
				/>
			) : (
				<Button
					onClick={() => setForm(true)}
					text={openDetails.state ? "Update Challenge" : "Add Challenge"}
				/>
			)}

			{/* Loading state while fetching the challenges */}
			{isLoading && <p className="mt-5 text-white text-4xl">Loading...</p>}

			{/* Error state while fetching the challenges */}
			{isError && <p className="mt-5 text-white text-4xl">{error.message}</p>}

			{/* Load all the challenges when fetch is successful */}
			{isSuccess && (
				<section className="mt-16 max-w-4xl m-auto">
					<h1 className="text-white text-center text-5xl">Challenges</h1>
					<div className="flex justify-between mt-10 max-w-6xl m-auto">
						{data.challenges.length === 0 ? (
							<p className="text-white text-4xl">
								No Challenges present! Add a Challenge!
							</p>
						) : (
							data.challenges.map((item) => {
								return (
									<ChallengeList
										key={item._id}
										item={item}
										deleteChallenge={() => deleteChallenge(item._id)}
										setOpenDetails={() =>
											setOpenDetails({
												state: true,
												title: item.title,
												description: item.description,
												category: item.category,
											})
										}
										setId={() => setId(item._id)}
									/>
								);
							})
						)}
					</div>
				</section>
			)}

			{/* Open Details about a given challenge and update it if needed */}
			{isSuccess &&
				data.challenges.length !== 0 &&
				data.challenges.map((item) => {
					return (
						<ChallengeDetails
							key={item._id}
							item={item}
							openDetails={openDetails}
							setOpenDetails={() =>
								setOpenDetails({
									state: false,
									title: item.title,
									description: item.description,
									category: item.category,
								})
							}
							setId={() => setId(null)}
							id={id}
						/>
					);
				})}

			{/* Delete Error if a given challenge cannot be deleted */}
			{isDeleteError && (
				<p className="mt-5 text-white text-4xl">{deleteError}</p>
			)}
		</main>
	);
}
