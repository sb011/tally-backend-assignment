import availabilityRepository from "../repositories/availability.repository";
import { object, string, ZodError } from "zod";

const getAvailabilitySchema = object({
  start: string({ required_error: "Start date is required" }).regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
    {
      message: "Invalid start date format. Expected ISO 8601",
    }
  ),
  end: string({ required_error: "End date is required" }).regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
    {
      message: "Invalid end date format. Expected ISO 8601",
    }
  ),
});

const getAvailability = async (startDate: string, endDate: string) => {
  try {
    getAvailabilitySchema.parse({ start: startDate, end: endDate });
    const events = await availabilityRepository.getCalendarEvents(
      startDate,
      endDate
    );
    return events;
  } catch (error) {
    if (error instanceof ZodError) {
      throw error;
    }
    throw new Error("Unable to get calendar events");
  }
};

export = {
  getAvailability,
};
