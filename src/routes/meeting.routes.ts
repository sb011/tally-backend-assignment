const meetingrouter = require("express").Router();
const meetingController = require("../controllers/meeting.controller");

// GET /availability
meetingrouter.post("/", (req: any, res: any) => {
  meetingController.setMeeting(req, res);
});

meetingrouter.get("/", (req: any, res: any) => {
  meetingController.getMeeting(req, res);
});

meetingrouter.get("/:id", (req: any, res: any) => {
  meetingController.getMeetingById(req, res);
});

module.exports = meetingrouter;
