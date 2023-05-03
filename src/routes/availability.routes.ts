import { Router } from "express";
import availabilityController from "../controllers/availability.controller";

const router = Router();

/**
 * GET /availability - Returns a list of available calendar events between the specified start and end dates.
 *
 * @param {string} startDate - The start date in ISO 8601 format (e.g. "2022-05-01T09:00").
 * @param {string} endDate - The end date in ISO 8601 format (e.g. "2022-05-05T17:00").
 * @returns {Array} - An array of calendar events.
 * @throws {Error} - If there is an error retrieving the calendar events.
 */
router.get("/", (req: any, res: any) => {
  availabilityController.getAvailability(req, res);
});

export default router;
