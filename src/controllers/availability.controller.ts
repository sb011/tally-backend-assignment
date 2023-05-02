const availabilityService = require("../services/availability.service");

exports.getAvailability = async (req: any, res: any) => {
  try {
    // const userId = req.query.userId as string;
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;
    const availability = await availabilityService.getAvailability(
      // userId,
      startDate,
      endDate
    );
    res.status(200).json(availability);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// export default availabilityController;
