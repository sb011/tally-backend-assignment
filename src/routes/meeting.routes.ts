import { Router } from "express";
import MeetingController from "../controllers/meeting.controller";

const meetingRouter = Router();

// GET /availability
meetingRouter.post("/", (req: any, res: any) => {
  MeetingController.setMeeting(req, res);
});

meetingRouter.get("/", (req: any, res: any) => {
  MeetingController.getMeeting(req, res);
});

meetingRouter.get("/:id", (req: any, res: any) => {
  MeetingController.getMeetingById(req, res);
});

// module.exports = meetingRouter;
export default meetingRouter;
