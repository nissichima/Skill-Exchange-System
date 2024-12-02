import Session from "../Models/session.model.js";
import { sendSessionNotifications } from "../Services/emailService.js";

export const fetchSession = async (req, res) => {  
  const { id } = req.params; // ** Added parameter extraction **

  try {
    const session = await Session.findById(id); // ** Fetch session from database **
    if (!session) {
      return res.status(404).json({ message: "Session not found" }); // ** Added not found handling **
    }

    res.status(200).json({
      participantName: session.participant, // ** Return session details **
      participantId: session.participant, // ** Placeholder for participant ID mapping **
      skill: session.skill,
      dateTime: session.dateTime,
      duration: session.duration,
      locationType: session.locationType,
    });
  } catch (error) {
    console.error("Error fetching session:", error); // ** Added error logging **
    res.status(500).json({ message: "Error fetching session", error });
  }

};
export const createSession = async (req, res) => {
  const { organizer, participant, skill, dateTime, duration, locationType} = req.body;

  try {
    const newSession = new Session({
      organizer,
      participant,
      skill,
      dateTime,
      duration,
      locationType,
    });

    const savedSession = await newSession.save();

    // Send notifications to both participant and organizer
    await sendSessionNotifications(savedSession);

    res.status(201).json({
      message: "Session created and notifications sent!",
      session: savedSession
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating session", error });
  }
};
