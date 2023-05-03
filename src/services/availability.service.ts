import availabilityRepository from "../repositories/availability.repository";
import * as z from "zod";

// Define a schema for validating the start and end dates
const getAvailabilitySchema = z.object({
  start: z
    .string({ required_error: "Start date is required" })
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, {
      message: "Invalid start date format. Expected ISO 8601",
    }),
  end: z
    .string({ required_error: "End date is required" })
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, {
      message: "Invalid end date format. Expected ISO 8601",
    }),
});

/**
 * Returns a list of available calendar events between the specified start and end dates.
 *
 * @param {string} startDate - The start date in ISO 8601 format (e.g. "2022-05-01T09:00").
 * @param {string} endDate - The end date in ISO 8601 format (e.g. "2022-05-05T17:00").
 * @returns {Array} - An array of calendar events.
 * @throws {Error} - If there is an error retrieving the calendar events.
 * @throws {ZodError} - If the input values do not conform to the defined schema.
 */
const getAvailability = async (startDate: string, endDate: string) => {
  // Validate the input values against the defined schema.
  getAvailabilitySchema.parse({ start: startDate, end: endDate });

  const events = await availabilityRepository.getCalendarEvents(
    startDate,
    endDate
  );
  return events;
};

export = {
  getAvailability,
};
