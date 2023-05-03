import { getCalendar } from "../utils/calendarConfig";

/**
 * Returns the user's calendar events between the specified dates.
 *
 * @param {string} startDate - The start date in ISO 8601 format (e.g. "2022-05-01T09:00").
 * @param {string} endDate - The end date in ISO 8601 format (e.g. "2022-05-05T17:00").
 * @returns {Array} - An array of calendar events.
 * @throws {Error} - If there is an error retrieving the calendar events.
 */
const getCalendarEvents = async (startDate: string, endDate: string) => {
  try {
    // Get the user's calendar
    const calendar = getCalendar();

    // Convert the start and end dates to ISO 8601 format
    const start = new Date(startDate).toISOString();
    const end = new Date(endDate).toISOString();

    // Define a freebusy query to get the user's busy slots between the specified dates
    const freebusyQuery = {
      timeMin: start,
      timeMax: end,
      timeZone: "UTC",
      items: [{ id: "primary" }],
    };
    const freebusyResult = await calendar.freebusy.query({
      requestBody: freebusyQuery,
    });
    const busySlots = freebusyResult.data.calendars.primary.busy;

    // Calculate the user's free slots between the specified dates
    const freeSlots = [];
    let current = new Date(start).getTime();
    for (const busySlot of busySlots) {
      const busyStart = new Date(busySlot.start).getTime();
      const busyEnd = new Date(busySlot.end).getTime();
      if (current < busyStart) {
        freeSlots.push({ start: new Date(current), end: new Date(busyStart) });
      }
      current = busyEnd;
    }
    if (current < new Date(end).getTime()) {
      freeSlots.push({ start: new Date(current), end: new Date(end) });
    }

    return freeSlots;
  } catch (error) {
    throw new Error("Unable to get calendar events");
  }
};

export = {
  getCalendarEvents,
};
