document.addEventListener('DOMContentLoaded', function() {
  // fetching elements by ID
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");

  const dayOutput = document.getElementById("DD");
  const monthOutput = document.getElementById("MM");
  const yearOutput = document.getElementById("YY");

  const form = document.querySelector(".form");

  // event listener for the form
  form.addEventListener('submit', function(e) {
    e.preventDefault(); 

    // age calculation based on today's date
    const currentDate = new Date(); 
    const inputDay = parseInt(dayInput.value);
    const inputMonth = parseInt(monthInput.value);
    const inputYear = parseInt(yearInput.value);

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; 
    const currentDay = currentDate.getDate();

    // Calculating the difference in years, months, and days
    let years = currentYear - inputYear;
    let months = currentMonth - inputMonth;
    let days = currentDay - inputDay;

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    if (days < 0) {
      const prevMonth = new Date(currentDate.getFullYear(), currentMonth - 1, 0);
      days += prevMonth.getDate();
      months--;
    }

    // Displaying the age
    yearOutput.textContent = years;
    monthOutput.textContent = months;
    dayOutput.textContent = days;
  });
});