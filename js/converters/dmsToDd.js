function convertDMSToDecimal(coordinate) {
    //console.log("Converting " + coordinate + " to DD")

    // Parse the coordinate using a regular expression
    var parts = coordinate.split(/[°''’]/);
    var firstPart = parts[0].split(" ");
    var hemisphere = firstPart[0];

    console.log(parts);

    for (var i = 1; i < parts.length; i++) {
      console.log(parts[i]);
    }

    // Extract degrees, minutes, seconds, and hemisphere
    var degrees = parseFloat(firstPart[1]);
    var minutes = parseFloat(parts[1]);
    var seconds = parseFloat(parts[2]);

    {
      {
        /* console.log("H: " + hemisphere)
console.log("D: " + degrees)
console.log("M: " + minutes)
console.log("S: " + seconds) */
      }
    }

    // Determine the sign based on hemisphere
    var sign = 1;
    if (hemisphere == "S" || hemisphere == "W") {
      sign = -1;
    }

    // Convert to decimal degrees and apply sign
    var decimalDegrees = sign * (degrees + minutes / 60 + seconds / 3600);

    var string =
      "degrees: " +
      degrees +
      "; minutes: " +
      minutes +
      "; seconds: " +
      seconds +
      "; hemisphere: " +
      hemisphere;
    console.log(string);

    return decimalDegrees;
  }