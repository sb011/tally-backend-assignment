import meetingRepository from "../repositories/meeting.repository";
import availabilityService from "./availability.service";
import * as z from "zod";

/**
 * Meeting schema to validate the meeting object
 * @property {string} summary - Required summary of the meeting
 * @property {string} description - Required description of the meeting
 * @property {string} start - Required start date of the meeting in ISO 8601 format
 * @property {string} end - Required end date of the meeting in ISO 8601 format
 */
const meetingSchema = z.object({
  summary: z.string({ required_error: "Summary is required" }),
  description: z.string({ required_error: "Description is required" }),
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
 * Meeting ID schema to validate the meeting ID
 * @property {string} id - Required ID of the meeting
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
  end: any
) => {
  try {
    meetingSchema.parse({
      summary,
      description,
      start,
      end,
    });

    const availability = await availabilityService.getAvailability(start, end);
    if (availability.length === 0) {
      throw new Error("Unable to set meeting");
    }

    const event = meetingRepository.setMeeting(
      summary,
      description,
      start,
      end
    );
    return event;
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      throw error;
    }
    throw new Error("Unable to set meeting");
  }
};

/**
 * Get the current meeting object.
 * @returns {object} - The current meeting object
 * @throws {Error} - If unable to get the meeting
 */
const getMeeting = async () => {
  try {
    const event = meetingRepository.getMeeting();
    return event;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get meeting");
  }
};

/**
 * Get the meeting object with the given ID.
 * @param {string} id - ID of the meeting
 * @returns {object} - The meeting object with the given ID
 * @throws {Error} - If unable to get the meeting or validation fails
 */
const getMeetingById = async (id: any) => {
  try {
    codeSchema.parse(id);
    const event = meetingRepository.getMeetingById(id);
    if (!event) {
      throw new Error("Unable to get meeting");
    }
    return event;
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      throw error;
    }
    throw new Error("Unable to get meeting");
  }
};

export = {
  setMeeting,
  getMeeting,
  getMeetingById,
};
