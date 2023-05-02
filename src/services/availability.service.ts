const availabilityRepository = require("../repositories/availability.repository");

exports.getAvailability = async (
  // userId: string,
  startDate: string,
  endDate: string
) => {
  try {
    const events = await availabilityRepository.getCalendarEvents(
      // userId,
      startDate,
      endDate
    );
    // Parse events to get free/busy times and return availability
    return events;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get calendar events");
  }
};
