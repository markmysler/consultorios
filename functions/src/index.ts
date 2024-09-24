import { CallableContext } from "firebase-functions/v1/https";

const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

interface EmailData {
	to: string;
	subject: string;
	text: string;
}

// Get Gmail credentials from environment config
const gmailEmail = process.env.SMTP_EMAIL;
const gmailPassword = process.env.SMTP_PASSWORD;

// Create a Nodemailer transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: gmailEmail,
		pass: gmailPassword,
	},
});

// Function to send email
exports.sendEmail = functions.https.onCall(
	async (data: EmailData, context: CallableContext) => {
		const { to, subject, text } = data;

		// Email options
		const mailOptions = {
			from: gmailEmail,
			to: to,
			subject: subject,
			text: text,
		};

		try {
			// Send the email
			await transporter.sendMail(mailOptions);
			return { success: true, message: "Email sent successfully" };
		} catch (error: any) {
			console.error("Error sending email:", error);
			return { success: false, error: error.message };
		}
	}
);
