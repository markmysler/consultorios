import { functions } from "@/firebase/init";
import { httpsCallable } from "firebase/functions";
import { useToast } from "primevue/usetoast";
const sendEmail = httpsCallable(functions, "sendEmail");

export const sendSupportEmail = async (subject, text) => {
	await sendEmail({
		to: "liobensignor@gmail.com",
		subject,
		text,
	})
		.then((result) => {
			if (result.data.success) {
				this.$toast.add({
					severity: "success",
					summary: "Email enviado",
					detail: "Su consulta será revisada por el equipo de soporte.",
					life: 3000,
				});
			} else {
				this.$toast.add({
					severity: "danger",
					summary: "El email no pudo ser enviado",
					detail: "Intentelo de nuevo más tarde",
					life: 3000,
				});
			}
		})
		.catch((error) => {
			console.log(error);
		});
};
export const sendLicenciaRequestEmail = async (subject, text) => {
	await sendEmail({
		to: "liobensignor@gmail.com",
		subject,
		text,
	})
		.then((result) => {
			if (result.data.success) {
				console.log("Email enviado");
			} else {
				console.log("Error enviando mail");
			}
		})
		.catch((error) => {
			console.log(error);
		});
};
