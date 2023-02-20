import { useState } from "react";
import {
	useCreateChallenge,
	useUpdateChallenge,
} from "../../query-hooks/challengeQueryHooks";

export default function ChallengeForm({ cancelForm, update, id }) {
	const [error, setError] = useState("");
	const initialState = {
		title: "",
		description: "",
		category: "true/false",
	};
	const [formData, setFormData] = useState(initialState);

	const { mutate: createChallenge, isError: isCreateError } =
		useCreateChallenge(setError);

	const { mutate: updateChallenge, isError: isUpdateError } =
		useUpdateChallenge(id, setError);

	const onSubmit = (e) => {
		e.preventDefault();
		update.state ? updateChallenge(formData) : createChallenge(formData);
		setFormData(initialState);
	};

	const onChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
		setError("");
	};

	return (
		<>
			<form className="flex gap-3" onSubmit={onSubmit}>
				<input
					className="px-3 bg-gray-700 rounded-lg placeholder-gray-500 text-white"
					type="text"
					placeholder="Title"
					id="title"
					value={formData.title}
					onChange={onChange}
				/>
				<input
					className="px-3 bg-gray-700 rounded-lg placeholder-gray-500 text-white"
					type="text"
					placeholder="Description"
					id="description"
					value={formData.description}
					onChange={onChange}
				/>
				<select
					className="px-3 bg-gray-700 text-white rounded-lg"
					value={formData.category}
					id="category"
					onChange={onChange}
				>
					<option value="true/false">true/false</option>
					<option value="MCQ">MCQ</option>
					<option value="fill in blanks">fill in blanks</option>
				</select>
				<button
					className="bg-red-500 text-black py-2 px-3.5 rounded-md"
					type="submit"
				>
					{update.state ? "Update Now" : "Add Now"}
				</button>
				<button
					className="bg-red-500 text-black py-2 px-3.5 rounded-md"
					type="button"
					onClick={cancelForm}
				>
					Cancel
				</button>
			</form>
			{(isCreateError || isUpdateError) && (
				<p className="mt-4 text-white text-3xl">{`${error}`}</p>
			)}
		</>
	);
}
