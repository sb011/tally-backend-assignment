import availabilityService from "../services/availability.service";
import { ZodError } from "zod";

/**
 * Route handler for the "/availability" endpoint. Returns a list of available calendar events between the specified start and end dates.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {Array} - An array of available calendar events.
 * @throws {Error} - If there is an error retrieving the calendar events.
 */
const getAvailability = async (req: any, res: any) => {
  try {
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;
    const availability = await availabilityService.getAvailability(
      startDate,
      endDate
    );
    res.status(200).json(availability);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export = {
  getAvailability,
};
