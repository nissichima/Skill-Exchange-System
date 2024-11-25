import sgMail from '@sendgrid/mail';

// Set up SendGrid API Key (from your environment variable)
sgMail.setApiKey('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');

// Function to send email using SendGrid
const sendEmail = async (to, subject, text) => {
  const msg = {
    to: to, // recipient's email
    from: 'mbaslar@torontomu.ca', // sender's email (SendGrid must verify this email)
    subject: subject,
    text: text,
  };

  try {
    // Send email via SendGrid
    await sgMail.send(msg);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sgMail;
