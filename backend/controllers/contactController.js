const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const buildHtml = ({ name, email, phone, subject, message }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { margin: 0; padding: 0; background: #f4f4f5; font-family: Arial, Helvetica, sans-serif; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .header { background: #18181b; padding: 24px 32px; }
    .header h1 { margin: 0; color: #ffffff; font-size: 20px; font-weight: 600; }
    .body { padding: 32px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #71717a; margin-bottom: 4px; }
    .value { font-size: 15px; color: #18181b; line-height: 1.5; }
    .message-box { background: #f4f4f5; border-left: 3px solid #18181b; padding: 16px; border-radius: 4px; margin-top: 4px; }
    .footer { padding: 20px 32px; background: #fafafa; text-align: center; font-size: 12px; color: #a1a1aa; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Enquiry</h1>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
      </div>
      ${phone ? `
      <div class="field">
        <div class="label">Phone</div>
        <div class="value">${phone}</div>
      </div>` : ''}
      ${subject ? `
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${subject}</div>
      </div>` : ''}
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${message}</div>
      </div>
    </div>
    <div class="footer">
      Elite Facade Solutions &mdash; Contact Form Submission
    </div>
  </div>
</body>
</html>
`;

exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    console.log(email);
    await transporter.sendMail({
      from: `"Elite Facade Contact" <${email}>`,
      to: process.env.SMTP_USER,
      subject: subject || `New enquiry from ${name}`,
      html: buildHtml({ name, email, phone, subject, message }),
    });

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
