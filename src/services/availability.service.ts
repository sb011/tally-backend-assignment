import * as z from "zod";
import { getCalendar } from "../utils/calendarConfig";

// Define a schema for validating the start and end dates
const getAvailabilitySchema = z.object({
  start: z
    .string({ required_error: "Start date is required" })
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
      message: "Invalid start date format. Expected ISO 8601",
    }),
  end: z
    .string({ required_error: "End date is required" })
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
      message: "Invalid end date format. Expected ISO 8601",
    }),
  email: z
    .string({ required_error: "Email is required" })
    .regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, {
      message: "Invalid email format. Expected email",
    }),
});

/**
 * Returns a list of available calendar events between the specified start and end dates.
 *
 * @param {string} startDate - The start date in ISO 8601 format (e.g. "2022-05-01T09:00").
 * @param {string} endDate - The end date in ISO 8601 format (e.g. "2022-05-05T17:00").
 * @param {string} email - The email address of the user.
 * @returns {Array} - An array of calendar events.
 * @throws {Error} - If there is an error retrieving the calendar events.
 * @throws {ZodError} - If the input values do not conform to the defined schema.
 */
const getAvailability = async (
  startDate: string,
  endDate: string,
  email: string
): Promise<any[]> => {
  // Validate the input values against the defined schema.
  getAvailabilitySchema.parse({ start: startDate, end: endDate, email: email });

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
    items: [{ id: email }],
  };
  const freebusyResult = await calendar.freebusy.query({
    requestBody: freebusyQuery,
  });
  const busySlots = freebusyResult.data.calendars[email].busy;

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
};

export = {
  getAvailability,
};
