export function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export function formatTodoDate(date) {
  if (!date) {
    return "";
  }

  const today = getTodayDate();

  if (date === today) {
    return "Today";
  }

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function getTodoDateStatus(todo, today = getTodayDate()) {
  if (todo.status) {
    return "Completed";
  }

  if (todo.targetDate === today) {
    return "Today";
  }

  const current = new Date();
  const target = new Date(todo.targetDate);
  const difference = Math.ceil(
    (target - current) / (1000 * 60 * 60 * 24),
  );

  if (difference > 0) {
    return `${difference} days left`;
  }

  return "Overdue";
}

export function getCalendarMonthDays(year, month) {
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0,
  ).getDate();

  const days = [];

  // Empty cells before the first day of the month
  for (
    let index = 0;
    index < firstDayOfMonth;
    index += 1
  ) {
    days.push(null);
  }

  // Actual days of the month
  for (
    let day = 1;
    day <= daysInMonth;
    day += 1
  ) {
    days.push(day);
  }

  return days;
}

export function getCalendarDateKey(year, month, day) {
  const monthValue = String(month + 1).padStart(2, "0");
  const dayValue = String(day).padStart(2, "0");

  return `${year}-${monthValue}-${dayValue}`;
}

export function formatCalendarMonth(year, month) {
  return new Date(year, month, 1).toLocaleDateString(
    "en-IN",
    {
      month: "long",
      year: "numeric",
    },
  );
}