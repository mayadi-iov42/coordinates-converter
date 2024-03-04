function calculatePolygonAreaInSquareDegrees(coords) {
    var area = 0;
    var numCoords = coords.length;
    var j = numCoords - 1;

    for (var i = 0; i < numCoords; i++) {
        area += (coords[j][0] + coords[i][0]) * (coords[j][1] - coords[i][1]);
        j = i;  // j is previous vertex to i
    }

    return Math.abs(area / 2);
}

function squareDegreesToSquareKilometers(squareDegrees) {

    console.log("Converting square degrees to km: " + squareDegrees)

    // Radius of the Earth in kilometers
    const earthRadiusKm = 6371.0;

    // Calculate the area of a circle with a radius of one degree of latitude or longitude
    const areaCircleOneDegree = Math.PI * Math.pow(earthRadiusKm, 2);

    // Calculate the area in square kilometers
    const areaSquareKm = areaCircleOneDegree * squareDegrees / 10000;

    return areaSquareKm;
}