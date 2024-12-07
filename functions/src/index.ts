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

interface NewLicenciaIn {
	inicio: Date;
	fin: Date;
	cuil: number;
	tipo: string;
	anio?: number | null;
	imagen?: string | null;
	operacion: "solicitud" | "creacion";
}
interface NewLicenciaOut {
	inicio: string;
	fin: string;
	cuil: number;
	estado: "aprobada" | "rechazada" | "pendiente";
	created_at: number;
	tipo: string;
	anio?: number | null;
	imagen?: string | null;
	aprobada_o_rechazada_por: number | null;
}

interface ConfirmOrDenyLicenciaIn {
	estado: "aprobada" | "rechazada";
	lic_id: string;
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

async function getUserData(uid: string) {
	const user = await db
		.collection("users")
		.doc(uid)
		.get()
		.catch((err: any) => {
			console.log(err);
			throw new Error(err);
		});
	if (!user.data()) {
		throw new Error("El usuario no existe");
	}
	return user.data();
}

function addDays(date: Date, days: number) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

function isDateBetweenDates(date: Date, startDate: Date, endDate: Date) {
	return date > startDate && date < endDate;
}

async function sendEmail(data: EmailData) {
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
			const caller = await getUserData(context.auth?.uid);
			if (caller["role"] !== "admin") {
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

exports.requestOrAddLicencia = functions.https.onCall(
	async (data: NewLicenciaIn, context: CallableContext) => {
		try {
			if (!context.auth) {
				return "Acceso denegado";
			}
			const caller = await getUserData(context.auth?.uid);
			if (caller["role"] !== "admin") {
				if (data.cuil !== caller["cuil"]) {
					return "Acceso denegado";
				}
				if (
					new Date(data.inicio) <
					addDays(
						new Date(data.inicio),
						caller["anticipacion_licencia"]
					)
				) {
					return "Fecha de inicio invalida";
				}
				if (!data.imagen || (data.tipo === "Ordinaria" && !data.anio)) {
					return "Solicitud incompleta";
				}
			}

			const existingLicencias = await db
				.collection("licencias")
				.where("cuil", "==", data.cuil)
				.where("estado", "in", ["aprobada", "pendiente"])
				.get();
			const docs = existingLicencias.docs;

			if (docs && docs.length > 0) {
				const conflictingLicencias = existingLicencias.docs
					.map((lic: any) => lic.data())
					.filter((lic: any) => {
						return (
							isDateBetweenDates(
								new Date(data.inicio),
								new Date(lic.inicio),
								new Date(lic.fin)
							) ||
							isDateBetweenDates(
								new Date(data.fin),
								new Date(lic.inicio),
								new Date(lic.fin)
							)
						);
					});
				if (conflictingLicencias.length !== 0) {
					return "El usuario ya tiene una licencia activa entre las fechas solicitadas";
				}
			}
			const newLicencia: NewLicenciaOut = {
				cuil: data.cuil,
				inicio: new Date(data.inicio).toJSON(),
				fin: new Date(data.fin).toJSON(),
				tipo: data.tipo,
				anio: data.anio || null,
				imagen: data.imagen || null,
				estado:
					caller["role"] === "admin" && data.operacion == "creacion"
						? "aprobada"
						: "pendiente",
				created_at: new Date().getTime(),
				aprobada_o_rechazada_por:
					caller["role"] === "admin" && data.operacion == "creacion"
						? caller["cuil"]
						: null,
			};

			try {
				const res = await db.collection("licencias").add(newLicencia);

				console.log(res);
			} catch (error) {
				console.log(error);
				return "Error agregando la licencia";
			}
			if (data.operacion == "solicitud") {
				const emailRes = await sendEmail({
					to: "liobensignor@gmail.com",
					subject: `Solicitud de licencia de ${caller["nombre"]} ${caller["apellido"]}`,
					text: `El profesional ${caller["nombre"]} ${caller["apellido"]} solicitó una licencia\nPara más información ingresá en la aplicación de consultorios externos\nImagen de la licencia: ${data.imagen}`,
				});
				if (!emailRes.success) {
					return "Error enviando solicitud";
				}
			}
			return data.operacion == "creacion"
				? "Licencia agregada"
				: "Licencia solicitada";
		} catch (error) {
			console.log(error);
			return "Vuelva a intentar mas tarde";
		}
	}
);
exports.confirmOrDenyLicencia = functions.https.onCall(
	async (data: ConfirmOrDenyLicenciaIn, context: CallableContext) => {
		try {
			if (!context.auth) {
				return "Acceso denegado";
			}
			const caller = await getUserData(context.auth?.uid);
			if (caller["role"] !== "admin") {
				return "Acceso denegado";
			}

			const licenciaRef = db.collection("licencias").doc(data.lic_id);
			const licencia = await licenciaRef.get().catch((error: any) => {
				console.log(error);
				return "La licencia no existe";
			});
			if (!licencia.data()) {
				return "La licencia no existe";
			}
			try {
				const res = await licenciaRef.update({
					estado: data.estado,
					aprobada_o_rechazada_por: caller["cuil"],
				});
				console.log(res);
				return "Estado de licencia actualizado: " + data.estado;
			} catch (error) {
				console.log(error);
				return "Error actualizando estado de licencia";
			}
		} catch (error) {
			console.log(error);
			return "Vuelva a intentar mas tarde";
		}
	}
);
