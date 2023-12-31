document.addEventListener("DOMContentLoaded", function () {
  // fetching elements by ID
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");
  const dayOutput = document.getElementById("DD");
  const monthOutput = document.getElementById("MM");
  const yearOutput = document.getElementById("YY");

  const form = document.querySelector(".form");

  // event listener for the form
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear previous errors
    const errorMessages = document.querySelectorAll("small");
    errorMessages.forEach((error) => (error.textContent = ""));

    // Function to check if the date provided is valid
    const isValidDate = (d, m, y) => {
      if (m === 2 && d > 29) {
        if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) {
          return false;
        } else {
          dayInput.nextElementSibling.textContent =
            "Invalid day for the selected month";
          return false;
        }
      }
      const date = new Date(y, m - 1, d);
      return (
        date.getDate() == d &&
        date.getMonth() + 1 == m &&
        date.getFullYear() == y
      );
    };

    // values for the date
    const inputDay = parseInt(dayInput.value);
    const inputMonth = parseInt(monthInput.value);
    const inputYear = parseInt(yearInput.value);

    //  handle validation
    function handleValidation() {
      let isValid = true;

      // Checking for empty fields
      if (!inputDay) {
        dayInput.nextElementSibling.textContent = "Day is required";
        isValid = false;
      }

      if (!inputMonth) {
        monthInput.nextElementSibling.textContent = "Month is required";
        isValid = false;
      }

      if (!inputYear) {
        yearInput.nextElementSibling.textContent = "Year is required";
        isValid = false;
      }

      // Day validity
      if (inputDay && (inputDay < 1 || inputDay > 31)) {
        dayInput.nextElementSibling.textContent = "Invalid day";
        isValid = false;
      }

      // Month validity
      if (inputMonth && (inputMonth < 1 || inputMonth > 12)) {
        monthInput.nextElementSibling.textContent = "Invalid month";
        isValid = false;
      }

      // Year validity
      if (inputYear && inputYear > new Date().getFullYear()) {
        yearInput.nextElementSibling.textContent =
          "Year can't be in the future";
        isValid = false;
      } else if (inputYear && inputYear <= 1900) {
        yearInput.nextElementSibling.textContent = "Invalid Year";
        isValid = false;
      }

      // Whole date validity
      if (isValid && !isValidDate(inputDay, inputMonth, inputYear)) {
        if (inputMonth === 2 && inputDay > 29) {
          dayInput.nextElementSibling.textContent =
            "Invalid day for the selected month";
        } else {
          dayInput.nextElementSibling.textContent =
            "Invalid day for the selected month";
        }
        isValid = false;
      }

      // Calculating age if all validations pass
      if (isValid) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();

        let years = currentYear - inputYear;
        let months = currentMonth - inputMonth;
        let days = currentDay - inputDay;

        if (months < 0 || (months === 0 && days < 0)) {
          years--;
          months += 12;
        }

        if (days < 0) {
          const monthDays = new Date(currentYear, currentMonth, 0).getDate();
          months--;
          days += monthDays;
        }

        // Display the values
        yearOutput.textContent = years;
        monthOutput.textContent = months;
        dayOutput.textContent = days;
      }
    }

    handleValidation();
  });
});
