import UTMLatLng from "utm-latlng";
import { CoordinateFormat } from "../../enums";
import {
	DecimalDegreeCoordinate,
	DegreesMinutesSecondsCoordinate,
	DegreesMinutesSecondsPoint,
	IsDecimalDegreeCoordinate,
	UniversalTraverseMercatorCoordinate,
} from "../../models/Coordinates";

export const ConvertCoordinates = (
	coordinates: any[],
	inputFormat: CoordinateFormat,
	outputFormat: CoordinateFormat
): { coordinates: any[]; err: string | null } => {
	var convertedCoordinates: any[] = [];

	console.log(
		"ConvertCoordinates got coordinates for conversion: " + coordinates
	);

	if (
		inputFormat == CoordinateFormat.UniversalTransverseMercator &&
		outputFormat == CoordinateFormat.DecimalDegrees
	) {
		for (var i = 0; i < coordinates.length; i++) {
			console.log("Converting UTM to DD");
			var { coordinate, err } = utmToDecimalDegrees(coordinates[i]);

			if (err != null) {
				return {
					coordinates: [],
					err: err,
				};
			}

			convertedCoordinates.push(coordinate);
		}
	} else if (
		inputFormat === CoordinateFormat.DegreesMinutesSeconds &&
		outputFormat === CoordinateFormat.DecimalDegrees
	) {
		for (var i = 0; i < coordinates.length; i++) {
			console.log("Converting DMS to DD");
			var { coordinate, err } = dmsToDecimalDegrees(coordinates[i]);

			if (err != null) {
				return {
					coordinates: [],
					err: err,
				};
			}

			convertedCoordinates.push(coordinate);
		}
	}

	console.log("Result of conversion: " + convertedCoordinates);

	return { coordinates: convertedCoordinates, err: null };
};

const utmToDecimalDegrees = (
	coordinate: UniversalTraverseMercatorCoordinate
): { coordinate: DecimalDegreeCoordinate | null; err: string | null } => {
	const utmConverter = new UTMLatLng();

	const ddCoordinate: any = utmConverter.convertUtmToLatLng(
		coordinate.easting,
		coordinate.northing,
		coordinate.zoneNumber,
		coordinate.zoneLetter
	);

	//console.log(ddCoordinate);

	if (typeof ddCoordinate === "string") {
		return { coordinate: null, err: ddCoordinate };
	}

	return {
		coordinate: {
			longitude: ddCoordinate.lng,
			latitude: ddCoordinate.lat,
		},
		err: null,
	};
};

const dmsToDecimalDegrees = (
	coordinate: DegreesMinutesSecondsCoordinate
): { coordinate: DecimalDegreeCoordinate | null; err: string | null } => {
	var latitude: number = 0;
	var longitude: number = 0;

	var { point, err } = dmsPointToDecimalDegreesPoint(coordinate.latitude);

	if (err !== null) {
		return { coordinate: null, err: err };
	} else if (point) {
		latitude = point;
	}

	var { point, err } = dmsPointToDecimalDegreesPoint(coordinate.longitude);

	if (err !== null) {
		return { coordinate: null, err: err };
	} else if (point) {
		longitude = point;
	}

	return {
		coordinate: {
			latitude: latitude,
			longitude: longitude,
		},
		err: null,
	};
};

const dmsPointToDecimalDegreesPoint = (
	point: DegreesMinutesSecondsPoint
): { point: number | null; err: string | null } => {
	var sign: number = 1;

	if (point.hemisphere === "S" || point.hemisphere === "W") {
		sign = -1;
	}

	var decimalDegreesPoint: number =
		sign * (point.degrees + point.minutes / 60 + point.seconds / 3600);

	return {
		point: decimalDegreesPoint,
		err: null,
	};
};
