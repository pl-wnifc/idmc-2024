


//////////////////////////////
//
// formatDate --
//

function formatDate(inputDate) {
	// Create a Date object from the input string (YYYY-MM-DD)
	let date = new Date(inputDate);

	// Define arrays for the day names and month names
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	let months = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];

	// Extract the necessary parts from the Date object
	let dayName = days[date.getUTCDay()]; // Get the day of the week (using UTC to avoid localization)
	let monthName = months[date.getUTCMonth()]; // Get the month (using UTC)
	let day = date.getUTCDate(); // Get the day of the month (using UTC)
	let year = date.getUTCFullYear(); // Get the year

	// Return the formatted string
	return `${dayName}, ${monthName} ${day}, ${year}`;
}



