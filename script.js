// script.js
function calculateZodiacMovement() {
    // Get time input
    const timeInput = document.getElementById('time').value;
    
    // If no time is provided, show an error message
    if (!timeInput) {
        document.getElementById('result').innerHTML = "Please enter a valid time.";
        return;
    }

    // Split time into hours, minutes, and seconds
    const [hours, minutes, seconds] = timeInput.split(':').map(Number);

    // Zodiac signs in 24 hours (each sign takes ~2 hours)
    const zodiacSigns = [
        { sign: "Aries", start: 0 },
        { sign: "Taurus", start: 2 },
        { sign: "Gemini", start: 4 },
        { sign: "Cancer", start: 6 },
        { sign: "Leo", start: 8 },
        { sign: "Virgo", start: 10 },
        { sign: "Libra", start: 12 },
        { sign: "Scorpio", start: 14 },
        { sign: "Sagittarius", start: 16 },
        { sign: "Capricorn", start: 18 },
        { sign: "Aquarius", start: 20 },
        { sign: "Pisces", start: 22 }
    ];

    // Convert time to total minutes in the day
    const totalMinutes = (hours * 60) + minutes + (seconds / 60);

    // Each sign lasts for 120 minutes (2 hours)
    const signDuration = 120; // 2 hours in minutes

    // Determine which zodiac sign is currently rising
    let currentZodiac = "";
    let degreeMoved = 0;
    for (let i = 0; i < zodiacSigns.length; i++) {
        const { sign, start } = zodiacSigns[i];
        const startTime = start * 60; // convert start time to minutes

        if (totalMinutes >= startTime && totalMinutes < startTime + signDuration) {
            currentZodiac = sign;
            degreeMoved = ((totalMinutes - startTime) / signDuration) * 30; // 30 degrees per sign
            break;
        }
    }

    // Calculate rising time in hours, minutes, and seconds
    const degreesPerMinute = 0.25; // 15 degrees per hour -> 0.25 degrees per minute
    const movementInMinutes = degreeMoved / degreesPerMinute;

    const risingHours = Math.floor(movementInMinutes / 60);
    const risingMinutes = Math.floor(movementInMinutes % 60);
    const risingSeconds = Math.floor((movementInMinutes % 1) * 60);

    // Display result
    document.getElementById('result').innerHTML = `
        The current zodiac sign is <strong>${currentZodiac}</strong>.<br>
        It has moved ${degreeMoved.toFixed(2)} degrees.<br>
        The rising time is ${risingHours} hours, ${risingMinutes} minutes, ${risingSeconds} seconds.
    `;
}
