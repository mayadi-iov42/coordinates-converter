function setHelperTextValue(coordinateFormat) {
    if (coordinateFormat == decimalDegrees) {
        coordinateInputHelperText.innerText = decimalDegreesHelperText
    } else if (coordinateFormat == degreesMinutesSeconds) {
        coordinateInputHelperText.innerText = degreesMinutesSecondsHelperText
    } else if (coordinateFormat == universalTraverseMercator) {
        coordinateInputHelperText.innerHTML = universalTraverseMercatorHelperText
    }
}

function addCoordinates() {
    let longitude = coordinateXField.value
    let latitude = coordinateYField.value
    let utmTimezone = utmTimezoneField.value
    let utmHemisphere = utmHemisphereSelector.value

    if (longitude !== "" && latitude !== "") {

        coordinateInputErrorDiv.style = "visibility: hidden"
        coordinateInputErrorText.innerHTML = ""
        var utmPrefix = ""

        if (currentCoordinateFormat == universalTraverseMercator) {
            if (utmTimezone == "") {
                coordinateInputErrorDiv.style = "visibility: visible"
                coordinateInputErrorText.innerHTML = "Please enter timezone value"
                return
            }

            utmPrefix = utmTimezone + "," + utmHemisphere + ","
        }

        let currentCoordinateTextFieldValue = coordinateTextField.value
        coordinateTextField.value = currentCoordinateTextFieldValue + "[" + utmPrefix + longitude + "," + latitude + "]," + "\n"
        coordinateXField.value = ""
        coordinateYField.value = ""
    } else {
        coordinateInputErrorDiv.style = "visibility: visible"
        coordinateInputErrorText.innerHTML = "Please enter both coordinate values"
    }

    console.log(longitude, latitude)
}

function changeCoordinateFormatMode() {

    console.log("Previous coordinate format: " + currentCoordinateFormat)
    let newMode = coordinateFormatDropdown.value
    clearCoordinateInputsAndOutputs()
    setHelperTextValue(newMode)
    currentCoordinateFormat = newMode

    if (newMode == universalTraverseMercator) {
        utmTimezoneSection.style = "display: block"
        utmHemisphereSection.style = "display: block"
    } else {
        utmTimezoneSection.style = "display: hidden"
        utmHemisphereSection.style = "display: hidden"
    }

    console.log("New coordinate format: " + currentCoordinateFormat)
    
}

function convertInsertedCoordinatesToGeoJson() {

    console.log("Converting")

    let coordinates = coordinateTextField.value

    let parsedCoordinates = parseEnteredCoordinates(coordinates, currentCoordinateFormat)

    geoJsonFile = geoJsonPrefix + "\n" + parsedCoordinates + geoJsonSuffix

    geoJsonCoordinatesArea.innerText = geoJsonFile

    displayGeoJsonOnMap(geoJsonFile)

    downloadGeoJsonButton.style = "visibility: display"

}

function displayGeoJsonOnMap(geoJson) {
    var jsonMap = JSON.parse(geoJson)

    map.eachLayer(function(layer) {
        map.removeLayer(layer);
    });

    standardMapLayer.addTo(map);

    var geojsonLayer = L.geoJSON(jsonMap).addTo(map);

    var coords = jsonMap.features[0].geometry.coordinates[0];
        for (var i = 0; i < coords.length; i++) {
            var marker = L.marker([coords[i][1], coords[i][0]]).addTo(map);
            marker.bindPopup("Coordinate: " + coords[i][0] + ", " + coords[i][1]);
    }

    map.fitBounds(geojsonLayer.getBounds(), { paddingTopLeft: [50, 50], paddingBottomRight: [50, 50] });

    var sqDgArea = calculatePolygonAreaInSquareDegrees(jsonMap.features[0].geometry.coordinates[0]);
    var sqKm = squareDegreesToSquareKilometers(sqDgArea);
    squareKilometersArea.innerHTML = "~" + parseFloat(sqKm).toFixed(2);
    hectaresArea.innerHTML = "~" + parseFloat(sqKm * 100).toFixed(2);
}

function clearCoordinateInputsAndOutputs() {
    coordinateXField.value = ""
    coordinateYField.value = ""
    coordinateTextField.value = ""
}

function parseEnteredCoordinates(coordinates, format) {

    var parsedCoordinates = []

    console.log("Parsing:\n" + coordinates)
    
    var coordinatePairs = coordinates.split("\n")

    //console.log("Length: " + coordinatePairs.length)

    for (let i = 0; i < coordinatePairs.length; i++) {

        if (coordinatePairs[i] == "") {
            break
        }

        console.log("Processing " + coordinatePairs[i])

        if (currentCoordinateFormat == universalTraverseMercator) {
            let utmInDD = utmCoordinatePairToDD(coordinatePairs[i])
            parsedCoordinates.push(utmInDD)
        } else {
            // Split pair into 2 parts
            var lng = coordinatePairs[i].split(",")[0].substring(1)
            var lat = coordinatePairs[i].split(",")[1].split("]")[0]

            console.log("Parsed into: |" + lng + "|" + lat + "|")

            if (format == degreesMinutesSeconds) {
                lng = convertDMSToDecimal(lng)
                lat = convertDMSToDecimal(lat)
            }

            parsedCoordinates.push("[" + lng + "," + lat + "]")
        }
    }

    parsedCoordinates.push(parsedCoordinates[0])

    return parsedCoordinates

}

function utmCoordinatePairToDD(coordinatePair) {

    console.log("UTM pair to DD")

    let parts = coordinatePair.split(",");
    let tz = parts[0].split("[")[1]
    let hem = parts[1];
    let lat = parseFloat(parts[2])
    let lon = parseFloat(parts[3].split("]")[0])

    var north = false;

    if (hem == "N") {
        north = true;
    }

    console.log(utmToDecimal(lat, lon, tz, north))

    return "[" + "1" + "," + "2" + "]"
}

function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

function onDownload() {
    const jsonGeoJson = JSON.parse(geoJsonFile);
    download(
      JSON.stringify(jsonGeoJson),
      "map" + ".json",
      "text/plain"
    );
}

function removeCoordinatesFromMap(lat, lon) {

}