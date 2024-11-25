import transporter from '../DB/mailer.js';  // This imports sgMail from mailer.js

const sendSessionNotifications = async (organizerEmail, participantEmail) => {
  try {
    const msg = {
      to: participantEmail,  // Send to participant
      from: 'your-email@example.com',  // Your email (set it to the sender's address)
      subject: 'Session Scheduled',
      text: 'You have a session scheduled. Please check your organizer.',
    };

    // Send email to participant
    await transporter.send(msg);  // This sends the email using SendGrid's send() method

    // Send email to organizer for confirmation
    const organizerMsg = {
      to: organizerEmail,
      from: 'your-email@example.com',
      subject: 'Session Confirmation',
      text: 'You have successfully scheduled a session with a participant.',
    };
    await transporter.send(organizerMsg);  // Send email to organizer
    
    console.log('Emails sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
  }
};

export { sendSessionNotifications };
