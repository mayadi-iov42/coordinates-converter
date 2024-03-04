// Coordinate input

let coordinateFormatDropdown = document.getElementById("coordinateFormatSelector");
let coordinateInputHelperText = document.getElementById("coordinateInputHelperText")
let utmTimezoneSection = document.getElementById("utmTimezone")
let utmTimezoneField = document.getElementById("utmTimezoneField")
let utmHemisphereSection = document.getElementById("utmHemisphere")
let utmHemisphereSelector = document.getElementById("utmHemisphereSelector")
let coordinateXField = document.getElementById("coordinateXField");
let coordinateYField = document.getElementById("coordinateYField");
let coordinateInputErrorDiv = document.getElementById("coordinateInputError")
let coordinateInputErrorText = document.getElementById("coordinateInputErrorText")
let coordinateTextField = document.getElementById("coordinateTextField")

// GeoJSON
let downloadGeoJsonButton = document.getElementById("downloadGeoJson")
let geoJsonCoordinatesArea = document.getElementById("geoJsonCoordinates")

// Map
let squareKilometersArea = document.getElementById("squareKilometersArea")
let hectaresArea = document.getElementById("hectaresArea")

// Helper text
let decimalDegreesHelperText = "Use following format: 54.5798"
let degreesMinutesSecondsHelperText = "Use following format: E 11°25’49.54’’"
let universalTraverseMercatorHelperText = "Use following format: 422557"

let geoJsonPrefix = '{"type": "FeatureCollection","features":[{"type": "Feature","properties": {},"geometry": {"coordinates": [[';
let geoJsonSuffix = ']],"type": "Polygon"}}]}';