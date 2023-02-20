import { useState } from "react";
import {
	useCreateChoice,
	useUpdateChoice,
} from "../../query-hooks/choicesQueryHooks";

export default function ChoiceForm({
	cancelForm,
	update,
	challengeId,
	choiceId,
}) {
	const [error, setError] = useState("");
	const initialState = {
		question: "",
	};

	const [formData, setFormData] = useState(initialState);

	const { mutate: createChoice, isError: isCreateError } = useCreateChoice(
		challengeId,
		setError
	);

	const { mutate: updateChoice, isError: isUpdateError } = useUpdateChoice(
		challengeId,
		choiceId,
		setError
	);

	const onSubmit = (e) => {
		e.preventDefault();
		update ? updateChoice(formData) : createChoice(formData);
		setFormData(initialState);
	};

	const onChange = (e) => {
		setFormData({ question: e.target.value });
		setError("");
	};

	return (
		<>
			<form className="flex flex-col gap-5" onSubmit={onSubmit}>
				<input
					className="px-3 bg-gray-700 rounded-lg py-2 placeholder-gray-500 text-white"
					type="text"
					placeholder="Question"
					id="question"
					value={formData.question}
					onChange={onChange}
				/>
				<button
					className="bg-red-500 text-black py-2 px-3.5 rounded-md"
					type="submit"
				>
					{update ? "Update Now" : "Add Now"}
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
				<p className="mt-4 text-white text-3xl">{`${
					isCreateError ? "CreateError" : "UpdateError"
				}${error}`}</p>
			)}
		</>
	);
}
