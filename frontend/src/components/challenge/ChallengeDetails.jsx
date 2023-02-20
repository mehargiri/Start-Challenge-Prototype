import { Link } from "react-router-dom";
import Button from "../Button";
export default function ChallengeDetails({
	item,
	openDetails,
	setOpenDetails,
	setId,
	id,
}) {
	const onClick = () => {
		setOpenDetails();
		setId();
	};
	return (
		<section
			className={`mt-5  max-w-lg m-auto border rounded-xl border-gray-500 p-5 ${
				openDetails.state && id === item._id ? "block" : "hidden"
			}`}
		>
			<div className="flex justify-between">
				<h1 className="text-white text-3xl">{item.title}</h1>
				<p className="text-gray-400 text-xl p-1.5 cursor-default">
					{item.category}
				</p>
			</div>
			<p className="text-gray-400 text-xl mb-10">{item.description}</p>
			<div className="flex justify-between">
				<Button onClick={onClick} text={"Close"} />
				{/* <button
					className="text-white border p-2 rounded-lg hover:border-red-500"
					onClick={onClick}
				>
					Close
				</button> */}
				<Link to={`/challenge/${id}/startLesson`}>
					<Button text={"Start Challenge"} />
				</Link>

				<Link to={`/challenge/${item._id}`}>
					<Button text={"Go to Challenge"} />
				</Link>
			</div>
		</section>
	);
}
