import {
	GeoJsonCoordinatesType,
	GeoJsonFeatureType,
	GeoJsonType,
} from "../enums";
import { DecimalDegreeCoordinate } from "./Coordinates";

export type GeoJsonCoordinatePair = [string, string];

export type GeoJsonPolygon = GeoJsonCoordinatePair[];

export type GeoJsonCoordinateStructure = GeoJsonPolygon[];

export interface GeoJsonFeature {
	type: GeoJsonFeatureType;
	properties: any;
	geometry: {
		coordinates: GeoJsonCoordinateStructure;
		type: GeoJsonCoordinatesType;
	};
}

export interface GeoJsonObject {
	type: GeoJsonType;
	features: GeoJsonFeature[];
}
