export default function SolutionList({
	item,
	setOpenSolutionDetails,
	deleteSolution,
	setSolutionId,
}) {
	const onClick = () => {
		setOpenSolutionDetails();
		setSolutionId();
	};
	return (
		<div className="flex gap-5 items-start cursor-pointer">
			<a
				onClick={onClick}
				className="no-underline text-4xl text-gray-500 font-semibold transition-all duration-[275ms] hover:scale-[1.2] hover:text-white"
			>
				{item.value} ({item.correct ? "true" : "false"})
			</a>
			<button
				type="button"
				className="text-bold text-gray-500 text-2xl transition-all duration-[275ms] hover:text-white"
				onClick={deleteSolution}
			>
				X
			</button>
		</div>
	);
}
