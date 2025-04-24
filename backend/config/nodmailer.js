// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "smtp-relay.brevo.com",
//   port: 587,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// export default transporter;

// config/nodemailer.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Optional but recommended: verify the connection
transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ Error setting up email transporter:", error.message);
  } else {
    console.log("✅ Email transporter is ready to send messages");
  }
});

export default transporter;
