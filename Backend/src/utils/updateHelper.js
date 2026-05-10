const buildUpdateData = (body, existingTodo) => {
  const { description, status, targetDate } = body;
  const updateData = {};

  // 🔹 Status (only boolean allowed)
  if (typeof status === "boolean") {
    updateData.status = status;
  }

  // 🔹 Description (ignore empty / null / non-string)
  if (
    typeof description === "string" &&
    description.trim().length > 0
  ) {
    updateData.description = description.trim();
  }

  // 🔹 Target Date (ignore empty, invalid, or same date)
  if (
    targetDate !== undefined &&
    targetDate !== null &&
    String(targetDate).trim() !== ""
  ) {
    const parsedDate = new Date(targetDate);

    // check valid date
    if (!isNaN(parsedDate)) {
      const newDate = parsedDate.toISOString().split("T")[0];
      const existingDate = existingTodo.targetDate
        ? new Date(existingTodo.targetDate).toISOString().split("T")[0]
        : null;

      // update only if different
      if (newDate !== existingDate) {
        updateData.targetDate = parsedDate;
      }
    }
  }

  return updateData;
};

module.exports = buildUpdateData;