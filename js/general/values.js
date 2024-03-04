let decimalDegrees = "Decimal Degrees";
let degreesMinutesSeconds = "Degrees Minutes Seconds";
let universalTraverseMercator = "Universal Transverse Mercator (UTM)"
let coordinateFormats = [decimalDegrees, degreesMinutesSeconds, universalTraverseMercator]

let standardMapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});