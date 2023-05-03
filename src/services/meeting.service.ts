import availabilityService from "./availability.service";
import * as z from "zod";
import BadRequestException from "../Exceptions/BadRequestException";
import { getCalendar } from "../utils/calendarConfig";

/**
 * Meeting schema to validate the meeting object
 * @property {string} summary - Required summary of the meeting
 * @property {string} description - Required description of the meeting
 * @property {string} start - Required start date of the meeting in ISO 8601 format
 * @property {string} end - Required end date of the meeting in ISO 8601 format
 * @property {string} attendees - Required attendees of the meeting
 * @throws {Error} - If validation fails
 * @returns {object} - The validated meeting object
 */
const meetingSchema = z.object({
  summary: z.string({ required_error: "Summary is required" }),
  description: z.string({ required_error: "Description is required" }),
  start: z
    .string({ required_error: "Start date is required" })
    .regex(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)$/, {
      message: "Invalid start date format. Expected ISO 8601",
    }),
  end: z
    .string({ required_error: "End date is required" })
    .regex(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)$/, {
      message: "Invalid end date format. Expected ISO 8601",
    }),
  attendees: z.string({ required_error: "Attendees are required" }),
});

/**
 * Meeting ID schema to validate the meeting ID
 * @property {string} id - Required ID of the meeting
 * @throws {Error} - If validation fails
 * @returns {object} - The validated meeting ID
 */
const codeSchema = z.string({ required_error: "Meeting id is required" });

/**
 * Set a meeting with the given summary, description, start, and end dates.
 * @param {string} summary - Summary of the meeting
 * @param {string} description - Description of the meeting
 * @param {string} start - Start date of the meeting in ISO 8601 format
 * @param {string} end - End date of the meeting in ISO 8601 format
 * @returns {object} - The created meeting object
 * @throws {Error} - If unable to set the meeting or validation fails
 */
const setMeeting = async (
  summary: any,
  description: any,
  start: any,
  end: any,
  attendees: any
) => {
  const calendar = getCalendar();

  meetingSchema.parse({
    summary,
    description,
    start,
    end,
    attendees,
  });

  const availability = await availabilityService.getAvailability(
    start,
    end,
    attendees
  );
  if (availability.length === 0) {
    throw new BadRequestException("No availability for the given dates");
  }

  const event = {
    summary: summary,
    description: description,
    start: {
      dateTime: start,
      timeZone: "UTC",
    },
    end: {
      dateTime: end,
      timeZone: "UTC",
    },
    attendees: [{ email: attendees }],
    reminders: {
      useDefault: true,
    },
  };
  const response = await calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });

  return response.data;
};

/**
 * Get the current meeting object.
 * @returns {object} - The current meeting object
 * @throws {Error} - If unable to get the meeting
 */
const getMeeting = async () => {
  const calendar = getCalendar();
  const response = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });
  return response.data;
};

/**
 * Get the meeting object with the given ID.
 * @param {string} id - ID of the meeting
 * @returns {object} - The meeting object with the given ID
 * @throws {Error} - If unable to get the meeting or validation fails
 */
const getMeetingById = async (id: any) => {
  const calendar = getCalendar();
  const response = await calendar.events.get({
    calendarId: "primary",
    eventId: id,
  });

  return response.data;
};

export = {
  setMeeting,
  getMeeting,
  getMeetingById,
};
