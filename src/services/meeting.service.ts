const meetingRepository = require("../repositories/meeting.repository");

exports.setMeeting = async (
  summary: any,
  description: any,
  start: any,
  end: any
) => {
  try {
    const event = meetingRepository.setMeeting(
      summary,
      description,
      start,
      end
    );
    return event;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to set meeting");
  }
};

exports.getMeeting = async () => {
  try {
    const event = meetingRepository.getMeeting();
    return event;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get meeting");
  }
};

exports.getMeetingById = async (id: any) => {
  try {
    const event = meetingRepository.getMeetingById(id);
    return event;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get meeting");
  }
};
