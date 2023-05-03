import meetingService from "../services/meeting.service";
import { ZodError } from "zod";

const setMeeting = async (req: any, res: any) => {
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
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMeeting = async (req: any, res: any) => {
  try {
    const event = await meetingService.getMeeting();
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMeetingById = async (req: any, res: any) => {
  try {
    const id = req.params.id as string;
    const event = await meetingService.getMeetingById(id);
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.issues });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export = {
  setMeeting,
  getMeeting,
  getMeetingById,
};
