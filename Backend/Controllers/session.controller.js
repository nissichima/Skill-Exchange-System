import Session from "../Models/session.model.js";
import { sendSessionNotifications } from "../Services/emailService.js";

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
