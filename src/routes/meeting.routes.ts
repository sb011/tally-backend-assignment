import { Router } from "express";
import MeetingController from "../controllers/meeting.controller";

const meetingRouter = Router();

/**
 * POST / - Post a new meeting.
 *
 * @param {string} title - The title of the meeting.
 * @param {string} description - The description of the meeting.
 * @param {string} startDate - The start date in ISO 8601 format (e.g. "2022-05-01T09:00").
 * @param {string} endDate - The end date in ISO 8601 format (e.g. "2022-05-05T17:00").
 * @param {string} startDate - The start date in ISO 8601 format (e.g. "2022-05-01T09:00").
 * @param {string} endDate - The end date in ISO 8601 format (e.g. "2022-05-05T17:00").
 * @returns {Object} - An object of calendar event.
 * @throws {Error} - If there is an error retrieving the calendar events.
 */
meetingRouter.post("/", (req: any, res: any) => {
  MeetingController.setMeeting(req, res);
});

/**
 * GET / - Get all meetings.
 * @returns {Array} - An array of calendar events.
 * @throws {Error} - If there is an error retrieving the calendar events.
 */
meetingRouter.get("/", (req: any, res: any) => {
  MeetingController.getMeeting(req, res);
});

/**
 * GET /:id - Get a meeting by id.
 * @returns {Object} - An object of calendar event.
 * @throws {Error} - If there is an error retrieving the calendar events.
 * @param {string} id - The id of the meeting.
 * @returns {Object} - An object of calendar event.
 */
meetingRouter.get("/:id", (req: any, res: any) => {
  MeetingController.getMeetingById(req, res);
});

export default meetingRouter;
