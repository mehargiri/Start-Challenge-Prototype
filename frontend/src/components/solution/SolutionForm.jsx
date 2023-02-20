import { useState } from "react";
import {
	useCreateSolution,
	useUpdateSolution,
} from "../../query-hooks/solutionsQueryHooks";

export default function SolutionForm({
	cancelForm,
	update,
	choiceId,
	solutionId,
}) {
	const [error, setError] = useState("");
	const initialState = {
		value: "",
		correct: "false",
	};

	const [formData, setFormData] = useState(initialState);

	const { mutate: createSolution, isError: isCreateError } = useCreateSolution(
		choiceId,
		setError
	);

	const { mutate: updateSolution, isError: isUpdateError } = useUpdateSolution(
		choiceId,
		solutionId,
		setError
	);

	const onSubmit = (e) => {
		e.preventDefault();
		update ? updateSolution(formData) : createSolution(formData);
		setFormData(initialState);
	};

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
		setError("");
	};

	return (
		<>
			<form className="flex flex-col gap-5 w-[15rem]" onSubmit={onSubmit}>
				<textarea
					className="px-3 bg-gray-700 rounded-lg py-2 placeholder-gray-500 text-white"
					placeholder="Solution"
					id="value"
					onChange={onChange}
					value={formData.value}
				/>
				<select
					className="px-3 py-2 bg-gray-700 text-white rounded-lg"
					value={formData.correct}
					id="correct"
					onChange={onChange}
				>
					<option value="true">true</option>
					<option value="false">false</option>
				</select>
				<button
					className="bg-red-500 text-black py-2 px-3.5 rounded-md max-w-[10rem] m-auto"
					type="submit"
				>
					{update ? "Update Now" : "Add Now"}
				</button>
				<button
					className="bg-red-500 text-black py-2 px-3.5 rounded-md max-w-[10rem] m-auto"
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
