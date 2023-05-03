import { getCalendar } from "../utils/calendarConfig";

/**
 * Sets a meeting on the user's calendar.
 *
 * @param {string} summary - The summary of the event.
 * @param {string} description - The description of the event.
 * @param {string} startDate - The start date in ISO 8601 format (e.g. "2022-05-01T09:00").
 * @param {string} endDate - The end date in ISO 8601 format (e.g. "2022-05-05T17:00").
 * @returns {Object} - Event object.
 * @throws {Error} - If there is an error retrieving the calendar events.
 */
const setMeeting = async (
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

/**
 * Returns the user's calendar events between the specified dates.
 *
 * @returns {Array} - An array of calendar events.
 * @throws {Error} - If there is an error retrieving the calendar events.
 */
const getMeeting = async () => {
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

/**
 * Returns the user's calendar event by id.
 *
 * @param {string} id - The id of the event.
 * @returns {Array} - An array of calendar events.
 * @throws {Error} - If there is an error retrieving the calendar events.
 */
const getMeetingById = async (id: any) => {
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

export = {
  setMeeting,
  getMeeting,
  getMeetingById,
};
