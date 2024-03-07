import { CoordinateFormat } from "../../enums";

export const GetCoordinateHelperText = (
	coordinateFormat: CoordinateFormat
): any => {
	if (coordinateFormat === CoordinateFormat.UniversalTransverseMercator) {
		return (
			<>
				Use the following format when entering coordinates into the text box:{" "}
				<strong>[19,M,422557,8777601]</strong>
				<br />
				<br />
				Where <strong>19</strong> is the zone number; <strong>M</strong> is the
				zone letter; <strong>422557</strong> is easting;
				<strong> 8777601</strong> is northing.
				<br />
				<br />
				Separate multiple coordinates by a coma (e.g.: [19,M,422557,8777601],
				[19,M,422558,8777701]) or use the form with the [Add] button to enter
				them one by one.
				<br />
				<br />
				Check which UTM zone and letter your location is in:{" "}
				<a
					href="https://www.dmap.co.uk/utmworld.htm"
					target="_blank"
					rel="noopener noreferrer"
				>
					link
				</a>
			</>
		);
	} else if (coordinateFormat === CoordinateFormat.DegreesMinutesSeconds) {
		return (
			<>
				Use the following format when entering coordinates into the text box:{" "}
				<strong>[N 01°14'04.68'',E 11°25'52.5'']</strong>
				<br />
				<br />
				Where <strong>E</strong> is the hemisphere; <strong>11°25'52.5</strong>{" "}
				is the degrees, minutes, seconds.
				<br />
				<br />
				Separate multiple coordinates by a coma (e.g.: [N 01°14'04.68'',E
				11°25'52.5''], [N 01°14'04.68'',E 11°25'52.5'']) or use the form with
				the [Add] button to enter them one by one.
			</>
		);
	} else if (coordinateFormat === CoordinateFormat.DecimalDegrees) {
		return (
			<>
				Use the following format when entering coordinates into the text box:{" "}
				<strong>[-11.057227322181243,-69.70902061125305]</strong>
				<br />
				<br />
				Where <strong>-11.057227322181243</strong> is the latitude and{" "}
				<strong>-69.70902061125305</strong> is the longitude.
				<br />
				<br />
				Separate multiple coordinates by a coma (e.g.:
				[-11.057227322181243,-69.70902061125305],
				[-11.057227322181243,-69.70902061125305]) or use the form with the [Add]
				button to enter them one by one.
			</>
		);
	} else {
		return "";
	}
};
