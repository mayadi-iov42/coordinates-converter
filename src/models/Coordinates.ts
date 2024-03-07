export interface DecimalDegreeCoordinate {
	latitude: number;
	longitude: number;
}

export const IsDecimalDegreeCoordinate = (
	coordinate: any
): coordinate is DecimalDegreeCoordinate => {
	return (
		(coordinate as DecimalDegreeCoordinate).latitude !== undefined &&
		(coordinate as DecimalDegreeCoordinate).longitude !== undefined
	);
};

export interface UniversalTraverseMercatorCoordinate {
	northing: number;
	easting: number;
	zoneNumber: number;
	zoneLetter: string;
}

export const IsUniversalTraverseMercatorCoordinate = (
	coordinate: any
): coordinate is UniversalTraverseMercatorCoordinate => {
	return (
		(coordinate as UniversalTraverseMercatorCoordinate).zoneNumber !==
			undefined &&
		(coordinate as UniversalTraverseMercatorCoordinate).zoneLetter !==
			undefined &&
		(coordinate as UniversalTraverseMercatorCoordinate).northing !==
			undefined &&
		(coordinate as UniversalTraverseMercatorCoordinate).easting !== undefined
	);
};

export interface DegreesMinutesSecondsPoint {
	hemisphere: string;
	degrees: number;
	minutes: number;
	seconds: number;
}

export interface DegreesMinutesSecondsCoordinate {
	longitude: DegreesMinutesSecondsPoint;
	latitude: DegreesMinutesSecondsPoint;
}

export interface Coordinates {
	zoneNumber?: string;
	zoneLetter?: string;
	coordinateX: string;
	coordinateY: string;
}
