export default function ChoiceList({
	item,
	setOpenChoiceDetails,
	deleteChoice,
	setChoiceId,
}) {
	const onClick = () => {
		setOpenChoiceDetails();
		setChoiceId();
	};
	return (
		<div className="flex items-start cursor-pointer">
			<a
				onClick={onClick}
				className="no-underline text-3xl w-[20rem] text-gray-500 font-semibold transition-all duration-[275ms] hover:scale-[1.2] hover:text-white"
			>
				{item.question}
			</a>
			<button
				type="button"
				className="text-bold px-5 text-gray-500 text-2xl transition-all duration-[275ms] hover:text-white"
				onClick={deleteChoice}
			>
				X
			</button>
		</div>
	);
}
