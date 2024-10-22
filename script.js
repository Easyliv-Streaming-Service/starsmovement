// script.js
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

    // Get month and day from the date input
    const month = inputDate.getUTCMonth() + 1; // Months are 0-based in JavaScript
    const day = inputDate.getUTCDate();

    // Parse time input into hours, minutes, and seconds
    const [hours, minutes, seconds] = timeInput.split(':').map(Number);

    // Zodiac signs and their ranges
    const zodiacSigns = [
        { sign: "Aries", startDate: new Date("2024-04-22"), endDate: new Date("2024-05-22") },
        { sign: "Taurus", startDate: new Date("2024-05-23"), endDate: new Date("2024-06-20") },
        { sign: "Gemini", startDate: new Date("2024-06-21"), endDate: new Date("2024-07-20") },
        { sign: "Cancer", startDate: new Date("2024-07-21"), endDate: new Date("2024-08-20") },
        { sign: "Leo", startDate: new Date("2024-08-21"), endDate: new Date("2024-09-22") },
        { sign: "Virgo", startDate: new Date("2024-09-23"), endDate: new Date("2024-10-24") },
        { sign: "Libra", startDate: new Date("2024-10-25"), endDate: new Date("2024-11-23") },
        { sign: "Scorpio", startDate: new Date("2024-11-24"), endDate: new Date("2024-12-21") },
        { sign: "Sagittarius", startDate: new Date("2024-12-22"), endDate: new Date("2024-01-17") },
        { sign: "Capricorn", startDate: new Date("2024-01-18"), endDate: new Date("2024-02-16") },
        { sign: "Aquarius", startDate: new Date("2024-02-17"), endDate: new Date("2024-03-19") },
        { sign: "Pisces", startDate: new Date("2024-03-20"), endDate: new Date("2024-04-21") }
    ];

    let currentZodiac = null;

    // Find which zodiac sign the input date falls into
    for (const zodiac of zodiacSigns) {
        if (inputDate >= zodiac.startDate && inputDate <= zodiac.endDate) {
            currentZodiac = zodiac.sign;
            break;
        }
    }

    // Calculate degree of the sun based on days passed in the zodiac period
    const startOfSign = new Date(currentZodiac ? zodiac.startDate : null);
    const daysPassed = Math.floor((inputDate - startOfSign) / (1000 * 60 * 60 * 24));
    const degreeOfSun = (daysPassed % 30) + 1; // Assuming each sign is 30 degrees

    // Calculate rising time based on degrees
    const risingTimeMinutes = degreeOfSun * 4;
    const risingHours = Math.floor(risingTimeMinutes / 60);
    const risingMinutes = risingTimeMinutes % 60;

    // Calculate the final rising time
    const sunRiseTime = new Date(`1970-01-01T06:00:00`);
    sunRiseTime.setMinutes(sunRiseTime.getMinutes() - risingTimeMinutes);

    const risingTimeString = `${sunRiseTime.getHours().toString().padStart(2, '0')}:${sunRiseTime.getMinutes().toString().padStart(2, '0')} AM`;

    // Display the result
    document.getElementById('result').innerHTML = `
        The degree of the sun in ${currentZodiac} is ${degreeOfSun}.<br>
        The rising time of ${currentZodiac} is: ${risingTimeString}, leading the sun 🌞 by ${risingHours} hours ${risingMinutes} minutes of local time.
    `;
}
