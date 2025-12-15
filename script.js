const daySelect = document.getElementById("day");
const monthSelect = document.getElementById("month");
const yearSelect = document.getElementById("year");
const result = document.getElementById("result");

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getDaysInMonth(year, month) {
  if (month === 1) {
    return isLeapYear(year) ? 29 : 28;
  }
  if ([3, 5, 8, 10].includes(month)) {
    return 30;
  }
  return 31;
}

function fillYears() {
  const currentYear = new Date().getFullYear();
  for (let y = currentYear - 10; y <= currentYear + 10; y++) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }
  yearSelect.value = currentYear;
}

function fillDays() {
  const year = +yearSelect.value;
  const month = +monthSelect.value;
  const maxDays = getDaysInMonth(year, month);

  const selectedDay = daySelect.value;
  daySelect.innerHTML = "";

  for (let d = 1; d <= maxDays; d++) {
    const option = document.createElement("option");
    option.value = d;
    option.textContent = d;
    daySelect.appendChild(option);
  }

  if (selectedDay <= maxDays) {
    daySelect.value = selectedDay;
  }
}

function showDate() {
  const d = String(daySelect.value).padStart(2, "0");
  const m = String(+monthSelect.value + 1).padStart(2, "0");
  const y = yearSelect.value;
  result.textContent = `Дата: ${d}.${m}.${y}`;
}

fillYears();
fillDays();
showDate();

monthSelect.addEventListener("change", () => {
  fillDays();
  showDate();
});

yearSelect.addEventListener("change", () => {
  fillDays();
  showDate();
});

daySelect.addEventListener("change", showDate);
