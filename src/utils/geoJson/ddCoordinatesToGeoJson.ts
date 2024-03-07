import {
	GeoJsonCoordinatesType,
	GeoJsonFeatureType,
	GeoJsonType,
} from "../../enums";
import { DecimalDegreeCoordinate } from "../../models/Coordinates";
import {
	GeoJsonCoordinatePair,
	GeoJsonObject,
	GeoJsonPolygon,
} from "../../models/GeoJson";

export const ConvertCoordinatesToGeoJson = (
	coordinates: DecimalDegreeCoordinate[]
): { geoJson: GeoJsonObject | null; err: string | null } => {
	var err: string = "";

	var geoJson: GeoJsonObject = {
		type: GeoJsonType.FeatureCollection,
		features: [
			{
				type: GeoJsonFeatureType.Feature,
				properties: {},
				geometry: {
					coordinates: [],
					type: GeoJsonCoordinatesType.Polygon,
				},
			},
		],
	};

	var geoJsonPolygon: GeoJsonPolygon = [];

	for (var i = 0; i < coordinates.length; i++) {
		var coordinatePair: GeoJsonCoordinatePair = [
			coordinates[i].longitude.toString(),
			coordinates[i].latitude.toString(),
		];
		geoJsonPolygon.push(coordinatePair);
	}

	geoJsonPolygon.push(geoJsonPolygon[0]);

	geoJson.features[0].geometry.coordinates.push(geoJsonPolygon);

	return { geoJson, err: null };
};
