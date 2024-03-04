function utmToDecimal(utmEasting, utmNorthing, zoneNumber, northernHemisphere) {
    // Constants
    const equatorialRadius = 6378137; // Earth's equatorial radius in meters
    const eccentricitySquared = 0.00669438; // Eccentricity squared for WGS 84

    // Variables
    const k0 = 0.9996; // Scale factor
    const e1 = (1 - Math.sqrt(1 - eccentricitySquared)) / (1 + Math.sqrt(1 - eccentricitySquared));
    const x = utmEasting - 500000; // Remove 500,000 meter offset for longitude
    let y = utmNorthing;

    // Adjust northing for southern hemisphere
    if (!northernHemisphere) {
        y -= 10000000; // Remove 10,000,000 meter offset for southern hemisphere
    }

    // Calculate meridional arc
    const m = y / k0;

    // Calculate parameters used in latitude calculation
    const mu = m / (equatorialRadius * (1 - (eccentricitySquared / 4) - (3 * Math.pow(eccentricitySquared, 2) / 64) - (5 * Math.pow(eccentricitySquared, 3) / 256)));
    const phi1Rad = mu + ((3 * e1 / 2) - (27 * Math.pow(e1, 3) / 32)) * Math.sin(2 * mu) + ((21 * e1 * e1 / 16) - (55 * Math.pow(e1, 4) / 32)) * Math.sin(4 * mu) + (151 * Math.pow(e1, 3) / 96) * Math.sin(6 * mu);
    const phi1 = phi1Rad * (180 / Math.PI);

    // Calculate radius of curvature in the prime vertical
    const n1 = equatorialRadius / Math.sqrt(1 - eccentricitySquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
    
    // Calculate footpoint latitude
    const rho = equatorialRadius * (1 - eccentricitySquared) / Math.pow(1 - eccentricitySquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
    const nu = equatorialRadius / Math.sqrt(1 - eccentricitySquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
    const psi = nu / rho;
    const psi2 = psi * psi;
    const psi3 = psi2 * psi;

    // Calculate coefficients for latitude conversion
    const d = x / (n1 * k0);
    const d2 = d * d;
    const d3 = d2 * d;
    const d4 = d3 * d;
    const d5 = d4 * d;
    const d6 = d5 * d;

    // Calculate latitude
    const latitude = phi1Rad - (nu * Math.tan(phi1Rad) / rho) * (d2 / 2 - (5 + 3 * psi + 10 * psi2 - 4 * psi3 - 9 * eccentricitySquared) * d4 / 24 + (61 + 90 * psi + 298 * psi2 + 45 * psi3) * d6 / 720);

    // Calculate longitude
    const longitude = (d - (1 + 2 * psi + psi2) * d3 / 6 + (5 - 2 * psi + 28 * psi2 - 3 * psi3 + 8 * eccentricitySquared + 24 * psi2) * d5 / 120) / Math.cos(phi1Rad);

    // Convert latitude and longitude to degrees
    const latitudeDeg = latitude * (180 / Math.PI);
    let longitudeDeg = longitude * (180 / Math.PI) + (6 * zoneNumber - 183);

    // Adjust longitude for western hemisphere
    if (!northernHemisphere) {
        longitudeDeg -= 360;
    }

    return [longitudeDeg, latitudeDeg];
}