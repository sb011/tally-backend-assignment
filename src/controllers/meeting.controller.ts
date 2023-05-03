import meetingService from "../services/meeting.service";
import { ZodError } from "zod";

/**
 * Route handler for the "/meeting" endpoint. Creates a new calendar event.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} - The newly created calendar event.
 * @throws {Error} - If there is an error creating the calendar event.
 */
const setMeeting = async (req: any, res: any) => {
  try {
    const summary = req.body.summary as string;
    const description = req.body.description as string;
    const start = req.body.start as string;
    const end = req.body.end as string;
    const attendees = req.body.attendees as string;
    const event = await meetingService.setMeeting(
      summary,
      description,
      start,
      end,
      attendees
    );
    res.status(200).json(event);
  } catch (error: any) {
    console.error(error);
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    } else if (error.message) {
      res.status(error.code).json({ message: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

/**
 * Route handler for the "/meeting" endpoint. Returns a list of calendar events.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {Array} - An array of calendar events.
 * @throws {Error} - If there is an error retrieving the calendar events.
 */
const getMeeting = async (req: any, res: any) => {
  try {
    const event = await meetingService.getMeeting();
    res.status(200).json(event);
  } catch (error: any) {
    console.error(error);
    if (error.message) {
      res.status(error.code).json({ message: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

/**
 * Route handler for the "/meeting/:id" endpoint. Returns a calendar event by id.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} - A calendar event.
 * @throws {Error} - If there is an error retrieving the calendar event.
 */
const getMeetingById = async (req: any, res: any) => {
  try {
    const id = req.params.id as string;
    const event = await meetingService.getMeetingById(id);
    res.status(200).json(event);
  } catch (error: any) {
    console.log(error);
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    } else if (error.message) {
      res.status(error.code).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export = {
  setMeeting,
  getMeeting,
  getMeetingById,
};
