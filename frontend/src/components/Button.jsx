export default function Button({ onClick, text, style, hide }) {
	return (
		<button
			disabled={hide}
			type="button"
			className={`border-2 border-gray-500 enabled:hover:border-red-500 font-bold text-white disabled:text-gray-500 p-4 rounded-md ${style}`}
			onClick={onClick}
		>
			{text}
		</button>
	);
}
