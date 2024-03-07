import React, { createContext, useState } from "react";
import { GeoJsonObject } from "../../models/GeoJson";

interface GeoJsonContextType {
	geoJson: GeoJsonObject | null;
	setGeoJson: (geoJson: GeoJsonObject | null) => void;
}

const GeoJsonContext = createContext<GeoJsonContextType>({
	geoJson: null,
	setGeoJson: () => {},
});

const GeoJsonContextProvider = ({ children }: any) => {
	const [geoJson, setGeoJson] = useState<GeoJsonObject | null>(null);

	return (
		<GeoJsonContext.Provider value={{ geoJson, setGeoJson }}>
			{children}
		</GeoJsonContext.Provider>
	);
};

export { GeoJsonContext, GeoJsonContextProvider };
