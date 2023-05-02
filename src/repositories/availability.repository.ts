// const { getCalendar } = require("../utils/calendarConfig");
import { getCalendar } from "../utils/calendarConfig";
// exports.getCalendarEvents = async (
//   userId: string,
//   startDate: string,
//   endDate: string
// ) => {
//   try {
//     const authUrl = getAuthUrl();
//     console.log("Authorize this app by visiting this URL:", authUrl);

//     // Get authorization code
//     const code = process.env.AUTH_CODE;
//     const tokens = await getAccessToken(code);

//     const calendar = getCalendar();
//     // Calculate start and end times in UTC
//     const startUtc = new Date(startDate + "UTC").toISOString();
//     const endUtc = new Date(endDate + "UTC").toISOString();

//     // Query the user's calendar for busy time slots
//     const freebusyQuery = {
//       timeMin: startUtc,
//       timeMax: endUtc,
//       timeZone: "UTC",
//       items: [{ id: "primary" }],
//     };
//     const freebusyResult = await calendar.freebusy.query({
//       requestBody: freebusyQuery,
//     });
//     const busySlots = freebusyResult.data.calendars.primary.busy;

//     // Convert busy time slots to free time slots
//     const freeSlots = [];
//     let current = new Date(startUtc).getTime();
//     for (const busySlot of busySlots) {
//       const busyStart = new Date(busySlot.start).getTime();
//       const busyEnd = new Date(busySlot.end).getTime();
//       if (current < busyStart) {
//         freeSlots.push({ start: current, end: busyStart });
//       }
//       current = busyEnd;
//     }
//     if (current < new Date(endUtc).getTime()) {
//       freeSlots.push({ start: current, end: endUtc });
//     }

//     return freeSlots;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Unable to get calendar events");
//   }
// };

exports.getCalendarEvents = async (
  // userId: string,
  startDate: string,
  endDate: string
) => {
  try {
    const calendar = getCalendar();
    if (!startDate || !endDate) {
      throw new Error("Missing required query parameters");
    }
    // Format start and end dates to ISO string
    const start = new Date(startDate).toISOString();
    const end = new Date(endDate).toISOString();
    // Fetch calendar events within given date range and time zone
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

    console.log(freeSlots);
    return freeSlots;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get calendar events");
  }
};
