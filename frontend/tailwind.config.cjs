/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			// keyframes: {
			// 	pop: {
			// 		"0%": { color: "rgb(107, 114, 128)", transform: "scale(1)" },
			// 		"100%": { color: "rgb(255, 255, 255)", transform: "scale(1.25)" },
			// 	},
			// },
			// animation: {
			// 	pop: "pop 0.25s ease-in-out both",
			// },
		},
	},
	plugins: [],
};
