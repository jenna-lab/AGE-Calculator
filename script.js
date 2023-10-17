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

      //check if date provided is valid
      const isValidDate = (d, m, y) => {
          if (m === 2 && d > 29) {
              if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) {
                  return false;
              } else {
                  dayInput.nextElementSibling.textContent = "Invalid day for the selected month";
                  return false;
              }
          }
          const date = new Date(y, m - 1, d);
          return date.getDate() == d && date.getMonth() + 1 == m && date.getFullYear() == y;
      };
      //values for the date
      const inputDay = parseInt(dayInput.value);
      const inputMonth = parseInt(monthInput.value);
      const inputYear = parseInt(yearInput.value);

      //checking for empty fields
      if (!inputDay || !inputMonth || !inputYear) {
          dayInput.nextElementSibling.textContent = inputDay ? "" : "Day is required";
          monthInput.nextElementSibling.textContent = inputMonth ? "" : "Month is required";
          yearInput.nextElementSibling.textContent = inputYear ? "" : "Year is required";

          //day validity
      } else if (inputDay < 1 || inputDay > 31) {
          dayInput.nextElementSibling.textContent = "Invalid day";

          //month validity
      } else if (inputMonth < 1 || inputMonth > 12) {
          monthInput.nextElementSibling.textContent = "Invalid month";

          //year validity
      } else if (inputYear > new Date().getFullYear()) {
          yearInput.nextElementSibling.textContent = "Year can't be in the future";

          // whole date validity
      } else if (!isValidDate(inputDay, inputMonth, inputYear)) {
          // Error message for invalid day in February for leap year
          if (inputMonth === 2 && inputDay > 29) {
              dayInput.nextElementSibling.textContent = "Invalid day for the selected month";
          } else {
              dayInput.nextElementSibling.textContent = "Invalid date";
          }
          //if all validations pass calculate current age
      } else {
          //today's date
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const currentMonth = currentDate.getMonth() + 1;
          const currentDay = currentDate.getDate();

          // Calculating THE AGE
          let years = currentYear - inputYear;
          let months = currentMonth - inputMonth;
          let days = currentDay - inputDay;

          // Displaying the age with animation
          animateValue(yearOutput, 0, years, 2000);
          animateValue(monthOutput, 0, months, 2000);
          animateValue(dayOutput, 0, days, 2000);
      }
  });

// Animate the numbers
function animateValue(element, start, end, duration) {
  let current = start;
  let range = end - start;
  let increment = end > start ? 1 : -1;
  let stepTime = Math.abs(Math.floor(duration / range));
  let timer = setInterval(function() {
      current += increment;
      if (current < 0) {
          element.textContent = "--"; 
      } else {
          element.textContent = current;
      }
      if (current == end) {
          clearInterval(timer);
      }
  }, stepTime);
}

});
