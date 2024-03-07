export enum CoordinateFormat {
	DecimalDegrees = "DD",
	DegreesMinutesSeconds = "DMS",
	UniversalTransverseMercator = "UTM",
}

export enum GeoJsonType {
	FeatureCollection = "FeatureCollection",
}

export enum GeoJsonFeatureType {
	Feature = "Feature",
}

export enum GeoJsonCoordinatesType {
	Polygon = "Polygon",
}

export const StandardMapLayer =
	"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
