import React from "react";
import HomePage from "./components/pages/HomePage";
import "./styles/main.css";
import { GeoJsonContextProvider } from "./components/context/GeoJson";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
	return (
		<div className="App">
			<GeoJsonContextProvider>
				<HomePage />
			</GeoJsonContextProvider>
		</div>
	);
}

export default App;
