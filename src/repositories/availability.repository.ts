import { getCalendar } from "../utils/calendarConfig";

const getCalendarEvents = async (startDate: string, endDate: string) => {
  try {
    const calendar = getCalendar();

    const start = new Date(startDate).toISOString();
    const end = new Date(endDate).toISOString();

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

    // Convert busy time slots to free time slots
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
