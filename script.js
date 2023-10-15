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

    // Clear previous errors
    const errorMessages = document.querySelectorAll("small");
    errorMessages.forEach(error => error.textContent = "");

    // Validations
    let isValid = true;

    if (dayInput.value === "" || monthInput.value === "" || yearInput.value === "") {
      isValid = false;
      if (dayInput.value === "") dayInput.nextElementSibling.textContent = "Day is required";
      if (monthInput.value === "") monthInput.nextElementSibling.textContent = "Month is required";
      if (yearInput.value === "") yearInput.nextElementSibling.textContent = "Year is required";
    } else {
      const inputDay = parseInt(dayInput.value);
      const inputMonth = parseInt(monthInput.value);
      const inputYear = parseInt(yearInput.value);

      const currentDate = new Date(); 
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; 
      const currentDay = currentDate.getDate();

      if (inputDay < 1 || inputDay > 31) {
        isValid = false;
        dayInput.nextElementSibling.textContent = "Invalid day";
      }
      if (inputMonth < 1 || inputMonth > 12) {
        isValid = false;
        monthInput.nextElementSibling.textContent = "Invalid month";
      }
      if (inputYear > currentYear) {
        isValid = false;
        yearInput.nextElementSibling.textContent = "Year can't be in the future";
      }

      // Check the validity of the date
      if (inputDay > new Date(inputYear, inputMonth, 0).getDate()) {
        isValid = false;
        dayInput.nextElementSibling.textContent = "Invalid date";
      }
    }

    if (isValid) {
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

      // Displaying the age
      yearOutput.textContent = years;
      monthOutput.textContent = months;
      dayOutput.textContent = days;
    }
  });
});
