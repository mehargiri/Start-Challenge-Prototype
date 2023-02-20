import MainPage from "./pages/MainPage";
import { Routes, Route } from "react-router-dom";

import ChallengePage from "./pages/ChallengePage";
import ChoicePage from "./pages/ChoicePage";
import StartChallengePage from "./pages/StartChallengePage";

export default function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/challenge/:challengeId" element={<ChallengePage />} />
				<Route
					path="/challenge/:challengeId/choice/:choiceId"
					element={<ChoicePage />}
				/>
				<Route
					path="/challenge/:challengeId/startLesson"
					element={<StartChallengePage />}
				/>
			</Routes>
		</>
	);
}
