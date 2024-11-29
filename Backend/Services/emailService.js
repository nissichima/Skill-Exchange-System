import { sgMail, fromEmail } from '../DB/mailer.js';  // Import sgMail and the 'from' email from mailer.js
import Session from '../Models/session.model.js';  // Import Session model
import User from '../Models/user.model.js';  // Import User model

const sendSessionNotifications = async (sessionDetails) => {
  const { organizer, participant, skill, dateTime, duration, locationType } = sessionDetails;

  try {
    // Fetch organizer and participant emails from the User database
    const organizerUser = await User.findOne({ username: organizer });
    const participantUser = await User.findOne({ username: participant });

    if (!organizerUser || !participantUser) {
      throw new Error('Organizer or participant not found in the database');
    }

    const organizerEmail = organizerUser.email;
    const participantEmail = participantUser.email;

    // Send email to participant
    const participantMsg = {
      to: participantEmail,
      from: fromEmail,  // From email from mailer.js
      subject: 'Session Scheduled',
      text: `You have a session scheduled with ${organizerUser.firstName} ${organizerUser.lastName} on ${skill}.\n\nDetails:\nDate and Time: ${dateTime}\nDuration: ${duration} hours\nLocation: ${locationType}`,
    };
    await sgMail.send(participantMsg);

    // Send email to organizer for confirmation
    const organizerMsg = {
      to: organizerEmail,
      from: fromEmail,  // From email from mailer.js
      subject: 'Session Confirmation',
      text: `You have successfully scheduled a session with ${participantUser.firstName} ${participantUser.lastName} on ${skill}.\n\nDetails:\nDate and Time: ${dateTime}\nDuration: ${duration} hours\nLocation: ${locationType}`,
    };
    await sgMail.send(organizerMsg);

    console.log('Emails sent successfully');
    console.log('Session details saved to the database');
  } catch (error) {
    console.error('Error processing session notifications or saving session:', error);
  }
};

export { sendSessionNotifications };
