import { functions } from "@/firebase/init";
import { httpsCallable } from "firebase/functions";

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
