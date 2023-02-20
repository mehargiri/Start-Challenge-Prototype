import { Link } from "react-router-dom";
import Button from "../Button";
export default function ChoiceDetails({
	item,
	challengeId,
	openChoiceDetails,
	setOpenChoiceDetails,
	choiceId,
	setChoiceId,
}) {
	const onClick = () => {
		setOpenChoiceDetails();
		setChoiceId();
	};
	return (
		<section
			className={` mt-5 max-w-md m-auto border rounded-xl border-gray-500 p-5 ${
				openChoiceDetails && choiceId === item._id ? "block" : "hidden"
			}`}
		>
			<h1 className="text-white text-3xl text-center">{item.question}</h1>
			<div className="mt-5 flex justify-between">
				<Button text={"Close"} onClick={onClick} />
				<Link to={`/challenge/${challengeId}/choice/${item._id}`} className="">
					<Button text={"Go to Choice"} />
				</Link>
			</div>
		</section>
	);
}
