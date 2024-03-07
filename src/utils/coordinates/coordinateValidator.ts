import { CoordinateFormat } from "../../enums";
import {
	IsUniversalTraverseMercatorCoordinate,
	UniversalTraverseMercatorCoordinate,
} from "../../models/Coordinates";

export const ValidateCoordinate = (
	coordinate: any,
	format:
		| CoordinateFormat.DecimalDegrees
		| CoordinateFormat.DegreesMinutesSeconds
		| CoordinateFormat.UniversalTransverseMercator
): { valid: boolean; err: string | null } => {
	var err: string = "";

	if (format === CoordinateFormat.UniversalTransverseMercator) {
		if (IsUniversalTraverseMercatorCoordinate(coordinate)) {
			if (isNaN(coordinate.zoneNumber)) {
				err += coordinate.zoneNumber + " is not a valid zone number;\n";
			}
			if (isNaN(coordinate.easting)) {
				err += coordinate.easting + " is not a valid value;\n";
			}
			if (isNaN(coordinate.northing)) {
				err += coordinate.northing + " is not a valid value;\n";
			}
		}
	}

	if (err !== "") {
		return { valid: false, err: err };
	}

	return { valid: true, err: null };
};
