import { useContext, useEffect, useState } from "react";
import { GeoJsonContext } from "../context/GeoJson";
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	GeoJSON,
	useMap,
} from "react-leaflet";
import * as L from "leaflet"; // Import Leaflet library
import "leaflet/dist/leaflet.css";
import { StandardMapLayer } from "../../enums";

interface mapMarker {
	id: string;
	position: {
		lat: number;
		lng: number;
	};
}

const MapContent = ({ showMarkers, setShowMarkers }: any) => {
	const { geoJson } = useContext(GeoJsonContext);
	const [layerKey, setLayerKey] = useState(0);
	const [markers, setMarkers] = useState<mapMarker[] | null>(null);
	const map = useMap();

	const markerIcon = L.divIcon({
		className: "map-marker",
		html: "<div class='map-marker-icon'><i class='bi bi-geo-alt-fill h3'></i></div>",
		iconSize: [30, 30],
		iconAnchor: [14, 28],
		popupAnchor: [0, -28],
	});

	useEffect(() => {
		if (map && geoJson) {
			console.log(geoJson);
			setLayerKey((prevKey) => prevKey + 1);
			const bounds = L.geoJSON(geoJson).getBounds();
			map.fitBounds(bounds);
			updateMarkers();
		} else if (geoJson === null) {
			map.eachLayer(function (layer) {
				console.log("Looking at layer " + layer);
				if (layer instanceof L.Marker) {
					map.removeLayer(layer);
				}
			});
			map.setView([51.505, -0.09], 13);
		}
	}, [map, geoJson]);

	const updateMarkers = () => {
		console.log("Updating markers");
		if (geoJson) {
			var mArr: mapMarker[] = [];
			for (
				var i = 0;
				i < geoJson.features[0].geometry.coordinates[0].length;
				i++
			) {
				console.log("HERE " + geoJson.features[0].geometry.coordinates[0][i]);
				const m: mapMarker = {
					id: String(i),
					position: {
						lat: parseFloat(geoJson.features[0].geometry.coordinates[0][i][1]),
						lng: parseFloat(geoJson.features[0].geometry.coordinates[0][i][0]),
					},
				};
				mArr.push(m);
			}

			setMarkers(mArr);

			console.log(markers);
		}
	};

	return (
		<>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url={StandardMapLayer}
			/>
			{geoJson !== null ? <GeoJSON key={layerKey} data={geoJson} /> : <></>}
			{showMarkers ? (
				markers ? (
					markers.map((marker) => (
						<Marker
							key={marker.id}
							position={marker.position}
							icon={markerIcon}
							// onclick={() => removeMarker(marker.id)}
						>
							<Popup>
								Lng: {marker.position.lng}
								<br />
								Lat: {marker.position.lat}
								<br />
								{/* <button onClick={() => removeMarker(marker.id)}>Remove</button> */}
							</Popup>
						</Marker>
					))
				) : (
					<></>
				)
			) : (
				<></>
			)}
		</>
	);
};

export const MapView = () => {
	const [markerToggle, setMarkerToggle] = useState<boolean>(true);

	const toggleMarkerDisplay = () => {
		setMarkerToggle(!markerToggle);
	};

	return (
		<div className="leaflet-map">
			<div className="row">
				<div className="col">
					<MapContainer
						center={[51.505, -0.09]}
						zoom={13}
						scrollWheelZoom={true}
					>
						<MapContent
							showMarkers={markerToggle}
							setShowMarkers={setMarkerToggle}
						></MapContent>
					</MapContainer>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value=""
							onChange={toggleMarkerDisplay}
							checked={markerToggle}
						/>
						<label className="form-check-label" htmlFor="flexCheckDefault">
							Show markers
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};
