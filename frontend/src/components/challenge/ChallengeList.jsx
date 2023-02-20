export default function ChallengeList({
	item,
	setOpenDetails,
	deleteChallenge,
	setId,
}) {
	const onClick = () => {
		setOpenDetails();
		setId();
	};
	return (
		<div className="flex gap-3 items-start cursor-pointer">
			<a
				onClick={onClick}
				className="no-underline text-3xl text-gray-500 font-semibold transition-all duration-[275ms] hover:scale-[1.2] hover:text-white"
			>
				{item.title}
			</a>
			<button
				type="button"
				className="text-bold text-gray-500 text-2xl transition-all duration-[275ms] hover:text-white"
				onClick={deleteChallenge}
			>
				X
			</button>
		</div>
	);
}
