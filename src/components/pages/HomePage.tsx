import { useContext } from "react";
import CoordinateInput from "../features/CoordinateInput";
import { GeoJsonContext } from "../context/GeoJson";
import { MapView } from "../features/Map";

const HomePage = () => {
	const { geoJson } = useContext(GeoJsonContext);

	const downloadGeoJson = () => {
		const content: string = JSON.stringify(geoJson);
		const a = document.createElement("a");
		const file = new Blob([content], { type: "text/plain" });
		a.href = URL.createObjectURL(file);
		a.download = "map.json";
		a.click();
	};

	return (
		<>
			<div>
				<div className="row">
					<div className="col">
						<div className="row">
							<div className="col">
								<h3>Enter coordinates</h3>
							</div>
						</div>
						<CoordinateInput />
					</div>
					<div className="col">
						<div className="row">
							<div className="col-8">
								<h3>Converted coords.</h3>
							</div>
							<div className="col-4">
								{geoJson !== null ? (
									<button
										type="button"
										className="btn btn-primary"
										id="downloadGeoJson"
										onClick={downloadGeoJson}
									>
										<i className="bi bi-download"></i> .json
									</button>
								) : (
									<></>
								)}
							</div>
						</div>
						<div className="row">
							<div className="col">
								{geoJson !== null ? JSON.stringify(geoJson, null, 2) : <></>}
							</div>
						</div>
					</div>
					<div className="col">
						<div className="row">
							<div className="col">
								<h3>Map</h3>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<MapView />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HomePage;
