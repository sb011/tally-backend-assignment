// const { getCalendar } = require("../utils/calendarConfig");
import { getCalendar } from "../utils/calendarConfig";

exports.setMeeting = async (
  summary: any,
  description: any,
  start: any,
  end: any
) => {
  try {
    const calendar = getCalendar();
    const event = {
      summary: summary,
      description: description,
      start: {
        dateTime: start,
        timeZone: "UTC",
      },
      end: {
        dateTime: end,
        timeZone: "UTC",
      },
    };
    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to create calendar event");
  }
};

exports.getMeeting = async () => {
  try {
    const calendar = getCalendar();
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get calendar event");
  }
};

exports.getMeetingById = async (id: any) => {
  try {
    const calendar = getCalendar();
    const response = await calendar.events.get({
      calendarId: "primary",
      eventId: id,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get calendar event");
  }
};
