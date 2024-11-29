import sgMail from '@sendgrid/mail';

// Set up SendGrid API Key (use your environment variable for security)
sgMail.setApiKey('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');

// You can define your sender email here if it is the same across emails
const fromEmail = 'mbaslar@torontomu.ca'; // Example, replace with your actual sender email

export { sgMail, fromEmail };