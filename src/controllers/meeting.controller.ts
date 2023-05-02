const meetingService = require("../services/meeting.service");

exports.setMeeting = async (req: any, res: any) => {
  try {
    const summary = req.body.summary as string;
    const description = req.body.description as string;
    const start = req.body.start as string;
    const end = req.body.end as string;
    const event = await meetingService.setMeeting(
      summary,
      description,
      start,
      end
    );
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getMeeting = async (req: any, res: any) => {
  try {
    const event = await meetingService.getMeeting();
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getMeetingById = async (req: any, res: any) => {
  try {
    const id = req.params.id as string;
    const event = await meetingService.getMeetingById(id);
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
