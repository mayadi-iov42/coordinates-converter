import { CoordinateFormat } from "../../enums";
import {
	DecimalDegreeCoordinate,
	DegreesMinutesSecondsCoordinate,
	DegreesMinutesSecondsPoint,
	UniversalTraverseMercatorCoordinate,
} from "../../models/Coordinates";
import { ValidateCoordinate } from "./coordinateValidator";

export const ParseCoordinates = (
	coordinates: string,
	format: CoordinateFormat
): {
	parsedCoordinates:
		| DecimalDegreeCoordinate[]
		| DegreesMinutesSecondsCoordinate[]
		| UniversalTraverseMercatorCoordinate[]
		| null;
	err: string | null;
} => {
	console.log("ParseCoordinates got coordinates for parsing: " + coordinates);

	var errAccumulator: string = "";

	var coordinateArray: string[] = coordinates.split("],");
	var cleanedUpArray: string[] = [];

	for (var i = 0; i < coordinateArray.length; i++) {
		var currentPair: string = coordinateArray[i];
		if (currentPair === "" || currentPair === "\n") {
			continue;
		}
		console.log("Current pair: " + currentPair);
		currentPair = currentPair.replace(/[\[\]\n]/g, "");
		console.log("Cleaned up pair: " + currentPair);
		cleanedUpArray.push(currentPair);
	}

	console.log(cleanedUpArray);

	if (format === CoordinateFormat.UniversalTransverseMercator) {
		console.log("ParseCoordinates parsing UTM coordinates");
		var parsedUtmCoordinates: UniversalTraverseMercatorCoordinate[] = [];
		var foundErr: boolean = false;

		for (var i = 0; i < cleanedUpArray.length; i++) {
			const { parsedCoordinate, err } = parseUTMCoordinateString(
				cleanedUpArray[i]
			);

			if (err !== null) {
				errAccumulator += err + "\n";
				foundErr = true;
				continue;
			} else {
				if (parsedCoordinate !== null) {
					parsedUtmCoordinates.push(parsedCoordinate);
				}
			}
		}

		if (errAccumulator !== "") {
			return { parsedCoordinates: null, err: errAccumulator };
		}

		return { parsedCoordinates: parsedUtmCoordinates, err: null };
	} else if (format === CoordinateFormat.DegreesMinutesSeconds) {
		console.log("ParseCoordinates parsing DMS coordinates: " + cleanedUpArray);
		var parsedDmsCoordinates: DegreesMinutesSecondsCoordinate[] = [];
		var foundErr: boolean = false;

		for (var i = 0; i < cleanedUpArray.length; i++) {
			const { parsedCoordinate, err } = parseDmsCoordinateString(
				cleanedUpArray[i]
			);

			if (err !== null) {
				errAccumulator += err + "\n";
				foundErr = true;
				continue;
			} else {
				if (parsedCoordinate !== null) {
					parsedDmsCoordinates.push(parsedCoordinate);
				}
			}
		}

		if (errAccumulator !== "") {
			return { parsedCoordinates: null, err: errAccumulator };
		}

		return { parsedCoordinates: parsedDmsCoordinates, err: null };
	} else if (format === CoordinateFormat.DecimalDegrees) {
		console.log("ParseCoordinates parsing DD coordinates: " + cleanedUpArray);
		var parsedDdCoordinates: DecimalDegreeCoordinate[] = [];
		var foundErr: boolean = false;

		for (var i = 0; i < cleanedUpArray.length; i++) {
			const { parsedCoordinate, err } = parseDdCoordinateString(
				cleanedUpArray[i]
			);

			if (err !== null) {
				errAccumulator += err + "\n";
				foundErr = true;
				continue;
			} else {
				if (parsedCoordinate !== null) {
					parsedDdCoordinates.push(parsedCoordinate);
				}
			}
		}

		if (errAccumulator !== "") {
			return { parsedCoordinates: null, err: errAccumulator };
		}

		return { parsedCoordinates: parsedDdCoordinates, err: null };
	}

	return { parsedCoordinates: [], err: null };
};

const parseUTMCoordinateString = (
	coordinateString: string
): {
	parsedCoordinate: UniversalTraverseMercatorCoordinate | null;
	err: string | null;
} => {
	console.log("parseUTMCoordinateString got string: " + coordinateString);

	var err: string = "";

	var parts: string[] = coordinateString.split(",");
	if (parts.length !== 4) {
		return { parsedCoordinate: null, err: "Wrong format." };
	}

	var parsedCoordinate: UniversalTraverseMercatorCoordinate = {
		zoneNumber: parseFloat(parts[0]),
		zoneLetter: parts[1],
		easting: parseFloat(parts[2]),
		northing: parseFloat(parts[3]),
	};

	if (
		!ValidateCoordinate(
			parsedCoordinate,
			CoordinateFormat.UniversalTransverseMercator
		)
	) {
		return { parsedCoordinate: null, err: err };
	}

	return { parsedCoordinate: parsedCoordinate, err: null };
};

const parseDmsCoordinateString = (
	coordinateString: string
): {
	parsedCoordinate: DegreesMinutesSecondsCoordinate | null;
	err: string | null;
} => {
	console.log(
		"parseDmsCoordinateString got string for parsing: " + coordinateString
	);

	var parts: string[] = coordinateString.split(",");
	if (parts.length !== 2) {
		return { parsedCoordinate: null, err: "Wrong format." };
	}

	const { parsedPoint: latitude, err: latitudeErr } = dmsPointStringToDmsPoint(
		parts[0]
	);

	if (latitudeErr !== null) {
		return { parsedCoordinate: null, err: latitudeErr };
	}

	const { parsedPoint: longitude, err: longitudeErr } =
		dmsPointStringToDmsPoint(parts[1]);

	if (longitudeErr !== null) {
		return { parsedCoordinate: null, err: longitudeErr };
	}

	if (longitude && latitude) {
		return {
			parsedCoordinate: {
				latitude: latitude,
				longitude: longitude,
			},
			err: null,
		};
	}

	return { parsedCoordinate: null, err: null };
};

const dmsPointStringToDmsPoint = (
	pointString: string
): { parsedPoint: DegreesMinutesSecondsPoint | null; err: string | null } => {
	console.log(
		"dmsPointStringToDmsPoint got string for parsing: " + pointString
	);

	const patterns = [
		/([EWNS])?\s?(\d+)\s?°\s?(\d+)’\s?(\d+(?:\.\d+)?)’’/,
		/([EWNS])?\s?(\d+)\s?°\s?(\d+)’\s?(\d+(?:\.\d+)?)”/,
		/(\d+)\s?°\s?(\d+)’\s?(\d+(?:\.\d+)?)’’\s?([EWNS])?/,
		/(\d+)\s?°\s?(\d+)’\s?(\d+(?:\.\d+)?)”\s?([EWNS])?/,
		/([EWNS])?\s?(\d+)\s?°\s?(\d+)'\s?(\d+(?:\.\d+)?)''/,
		/(\d+)\s?°\s?(\d+)'\s?(\d+(?:\.\d+)?)''\s?([EWNS])?/,
	];

	var matched: boolean = false;

	var hemisphere: string = "";
	var degrees: number = 0;
	var minutes: number = 0;
	var seconds: number = 0;

	var patternNumber: number = 1;

	for (const pattern of patterns) {
		const match = pointString.match(pattern);
		if (match) {
			// Extract parts from the matched groups
			hemisphere = match[1] || match[4] || "";
			degrees = parseFloat(match[2]);
			minutes = parseFloat(match[3]);
			seconds = parseFloat(match[4]);

			matched = true;

			break;
		} else {
			console.log(pointString + " din't match pattern number " + patternNumber);
		}
		patternNumber++;
	}

	if (!matched) {
		return {
			parsedPoint: null,
			err: pointString + " does not match any of the patterns",
		};
	}

	const coordinatePoint: DegreesMinutesSecondsPoint = {
		hemisphere: hemisphere,
		degrees: degrees,
		minutes: minutes,
		seconds: seconds,
	};

	console.log("dmsPointStringToDmsPoint parse result: ");
	console.log(coordinatePoint);

	return { parsedPoint: coordinatePoint, err: null };
};

const parseDdCoordinateString = (
	coordinateString: string
): { parsedCoordinate: DecimalDegreeCoordinate | null; err: string | null } => {
	const parts: string[] = coordinateString.split(",");

	if (parts.length !== 2) {
		return {
			parsedCoordinate: null,
			err: coordinateString + " has wrong format",
		};
	}

	const latitude: number = parseFloat(parts[0]);
	const longitude: number = parseFloat(parts[1]);

	if (isNaN(latitude) || isNaN(longitude)) {
		return {
			parsedCoordinate: null,
			err: coordinateString + " has wrong format",
		};
	}

	const coordinate: DecimalDegreeCoordinate = {
		latitude: parseFloat(parts[0]),
		longitude: parseFloat(parts[1]),
	};

	return { parsedCoordinate: coordinate, err: null };
};
