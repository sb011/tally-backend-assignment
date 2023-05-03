import meetingRepository from "../repositories/meeting.repository";
import availabilityService from "./availability.service";
import * as z from "zod";

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

const codeSchema = z.string({ required_error: "Meeting id is required" });

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

const getMeeting = async () => {
  try {
    const event = meetingRepository.getMeeting();
    return event;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get meeting");
  }
};

const getMeetingById = async (id: any) => {
  try {
    codeSchema.parse(id);
    const event = meetingRepository.getMeetingById(id);
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
