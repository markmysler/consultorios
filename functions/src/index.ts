import { CallableContext } from "firebase-functions/v1/https";

const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const functions = require("firebase-functions");
admin.initializeApp();

const db = admin.firestore();

const anticipacionLicenciasMap: { [x: string]: number } = {
	PAI: 10,
	Omnicanal: 36,
};

interface EmailData {
	to: string;
	subject: string;
	text: string;
}
interface UserDataIn {
	email: string;
	nombre: string;
	apellido: string;
	tipoAgenda: string;
	cuil: number;
	especialidades: Array<string>;
	subespecialidades: Array<string>;
	turnos: Array<string>;
	jefes: Array<number>;
}
interface UserDataOut {
	email: string;
	nombre: string;
	apellido: string;
	anticipacion_licencia: number;
	tipoAgenda?: string;
	cuil: number;
	especialidades: Array<string>;
	subespecialidades: Array<string>;
	turnos: Array<string>;
	jefes: Array<number>;
	confirmo_horarios: boolean;
	role: "profesional" | "admin";
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

async function checkIsAdmin(uid: string) {
	const user = await db.collection("users").doc(uid).get();
	if (!user.data() || user.data()["role"] !== "admin") {
		return false;
	} else {
		return true;
	}
}

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

exports.addProfesional = functions.https.onCall(
	async (data: UserDataIn, context: CallableContext) => {
		try {
			if (!context.auth) {
				return "Acceso denegado";
			}
			const isAdmin = await checkIsAdmin(context.auth?.uid);
			if (!isAdmin) {
				return "Acceso denegado";
			}
			let response;
			const { email, cuil, tipoAgenda } = data;
			const newUser: UserDataOut = {
				...data,
				confirmo_horarios: false,
				role: "profesional",
				anticipacion_licencia: anticipacionLicenciasMap[tipoAgenda],
			};

			delete newUser.tipoAgenda;

			await admin
				.auth()
				.createUser({
					email: email,
					password: cuil.toString(),
				})
				.then(async (res: any) => {
					await db
						.collection("users")
						.doc(res.uid)
						.set(newUser)
						.then(() => {
							response = "Usuario creado.";
						})
						.catch(() => {
							response =
								"Error agregando al usuario a la base de datos.";
						});
				})
				.catch(() => {
					response = "Error creando cuenta.";
				});
			return response;
		} catch (error) {
			console.log(error);
			return error;
		}
	}
);
