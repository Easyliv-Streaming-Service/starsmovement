function calculateZodiacMovement() {
    // Get the date and time input
    const dateInput = document.getElementById('date').value;
    const timeInput = document.getElementById('time').value;

    // Check if date or time input is missing
    if (!dateInput || !timeInput) {
        document.getElementById('result').innerHTML = "Please enter a valid date and time.";
        return;
    }

    // Parse the date input
    const inputDate = new Date(dateInput);
    const [hours, minutes] = timeInput.split(':').map(Number);
    inputDate.setHours(hours, minutes, 0, 0); // Set the time

    // Sidereal zodiac signs and their ranges, along with their associated planets
    const zodiacSigns = [
        { sign: "Aries", start: new Date(inputDate.getFullYear(), 3, 22), end: new Date(inputDate.getFullYear(), 4, 21), planet: "Mars", degree: 31 },
        { sign: "Taurus", start: new Date(inputDate.getFullYear(), 4, 22), end: new Date(inputDate.getFullYear(), 5, 20), planet: "Venus", degree: 29 },
        { sign: "Gemini", start: new Date(inputDate.getFullYear(), 5, 21), end: new Date(inputDate.getFullYear(), 6, 20), planet: "Mercury", degree: 30 },
        { sign: "Cancer", start: new Date(inputDate.getFullYear(), 6, 21), end: new Date(inputDate.getFullYear(), 7, 20), planet: "Moon", degree: 31 },
        { sign: "Leo", start: new Date(inputDate.getFullYear(), 7, 21), end: new Date(inputDate.getFullYear(), 8, 22), planet: "Sun", degree: 33 },
        { sign: "Virgo", start: new Date(inputDate.getFullYear(), 8, 23), end: new Date(inputDate.getFullYear(), 9, 24), planet: "Mercury", degree: 32 },
        { sign: "Libra", start: new Date(inputDate.getFullYear(), 9, 25), end: new Date(inputDate.getFullYear(), 10, 23), planet: "Venus", degree: 30 },
        { sign: "Scorpio", start: new Date(inputDate.getFullYear(), 10, 24), end: new Date(inputDate.getFullYear(), 11, 21), planet: "Mars", degree: 28 },
        { sign: "Sagittarius", start: new Date(inputDate.getFullYear(), 11, 22), end: new Date(inputDate.getFullYear() + 1, 0, 17), planet: "Jupiter", degree: 27 },
        { sign: "Capricorn", start: new Date(inputDate.getFullYear(), 0, 18), end: new Date(inputDate.getFullYear(), 1, 16), planet: "Saturn", degree: 30 },
        { sign: "Aquarius", start: new Date(inputDate.getFullYear(), 1, 17), end: new Date(inputDate.getFullYear(), 2, 19), planet: "Saturn", degree: 31 },
        { sign: "Pisces", start: new Date(inputDate.getFullYear(), 2, 20), end: new Date(inputDate.getFullYear(), 3, 21), planet: "Jupiter", degree: 33 }
    ];

    let currentZodiac = null;
    let associatedPlanet = null;
    let zodiacDegree = null;

    // Find which zodiac sign the input date falls into
    for (const zodiac of zodiacSigns) {
        if (inputDate >= zodiac.start && inputDate <= zodiac.end) {
            currentZodiac = zodiac.sign;
            associatedPlanet = zodiac.planet;
            zodiacDegree = zodiac.degree; // Get the degree associated with the zodiac
            break;
        }
    }

    // If no zodiac sign is found
    if (!currentZodiac) {
        document.getElementById('result').innerHTML = "No zodiac sign found for this date.";
        return;
    }

    // Calculate the degree of the sun based on the provided zodiac degree
    const startOfSign = zodiacSigns.find(z => z.sign === currentZodiac).start;
    const daysPassed = Math.floor((inputDate - startOfSign) / (1000 * 60 * 60 * 24));
    const degreeOfSun = (daysPassed % zodiacDegree) + 1; // Wrap around the degree

    // Calculate rising time based on degrees
    const risingTimeMinutes = degreeOfSun * 4; // 4 minutes per degree
    const risingHours = Math.floor(risingTimeMinutes / 60);
    const risingMinutes = risingTimeMinutes % 60;

    // Calculate the final rising time
    const sunRiseTime = new Date(`1970-01-01T06:00:00`);
    sunRiseTime.setMinutes(sunRiseTime.getMinutes() - risingTimeMinutes);

    // Format time for display
    const risingTimeString = `${sunRiseTime.getHours().toString().padStart(2, '0')}:${sunRiseTime.getMinutes().toString().padStart(2, '0')} AM`;

    // Calculate the movement of the zodiac
    const movementOfSun = (degreeOfSun / zodiacDegree) * 100; // Percentage of the sign's degree covered
    const movementString = `${degreeOfSun} degrees (${movementOfSun.toFixed(2)}%) of ${currentZodiac}`;

    // Display the result
    document.getElementById('result').innerHTML = `
        The degree of the sun in ${currentZodiac} is ${degreeOfSun}.<br>
        The movement of the Sun in ${currentZodiac} is: ${movementString}.<br>
        The rising time of ${currentZodiac} is: ${risingTimeString}, leading the sun 🌞 by ${risingHours} hours ${risingMinutes} minutes of local time.<br>
        The ruling planet of ${currentZodiac} is ${associatedPlanet}.
    `;
}

// Automatically set today's date and time
window.onload = function() {
    const today = new Date();
    document.getElementById('date').value = today.toISOString().split('T')[0]; // Set date input to today's date
    document.getElementById('time').value = today.toTimeString().slice(0, 5); // Set time input to current time
};
