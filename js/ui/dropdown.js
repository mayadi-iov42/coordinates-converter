function addOptionsToCoordinateFormatDropdown() {
    console.log("Adding following values to coordinate format selector:")
    console.log(coordinateFormats)
    
    
    for (let i = 0; i < coordinateFormats.length; i++) {
        console.log("Adding option " + coordinateFormats[i])
        let option = document.createElement('option');
        option.value = coordinateFormats[i];
        option.textContent = coordinateFormats[i];
        coordinateFormatDropdown.appendChild(option);
    }
}