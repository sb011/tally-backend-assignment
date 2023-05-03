import availabilityService from "../services/availability.service";
import { ZodError } from "zod";

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
