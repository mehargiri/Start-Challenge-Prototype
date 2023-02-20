import { Link } from "react-router-dom";
export default function SolutionDetails({
	item,
	choiceId,
	openSolutionDetails,
	setOpenSolutionDetails,
	solutionId,
	setSolutionId,
}) {
	const onClick = () => {
		setOpenSolutionDetails();
		setSolutionId();
	};
	return (
		<section
			className={`mt-5  max-w-md m-auto border rounded-xl border-gray-500 p-5 ${
				openSolutionDetails && solutionId === item._id ? "block" : "hidden"
			}`}
		>
			<h1 className="text-white text-3xl text-center">
				{item.value} ({item.correct})
			</h1>
			<div className="mt-5 flex justify-between">
				<button
					className="text-white border p-2 rounded-lg hover:border-red-500"
					onClick={onClick}
				>
					Close
				</button>
				<Link
					to={`/challenge/${choiceId}/choice/${item._id}`}
					className="text-white border p-2 rounded-lg hover:border-red-500"
				>
					Go to Choice
				</Link>
			</div>
		</section>
	);
}
