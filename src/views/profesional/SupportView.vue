<template>
	<main class="w-full">
		<h2>Soporte</h2>
		<FormSupportComponentVue
			:opcionesAsuntos="opcionesAsuntos"
			:sendSupportEmail="sendSupportEmail"
		/>
	</main>
</template>

<script>
import FormSupportComponentVue from "@/components/support/FormSupportComponent.vue";
import { functions } from "@/firebase/init";
import { httpsCallable } from "firebase/functions";

export default {
	name: "SupportView",
	components: {
		FormSupportComponentVue,
	},
	data() {
		return {
			opcionesAsuntos: [
				"Opcion 1",
				"Opcion 2",
				"Opcion 3",
				"Opcion 4",
				"Opcion 5",
				"Otro",
			],
		};
	},
	methods: {
		async sendSupportEmail(subject, text) {
			const sendEmail = httpsCallable(functions, "sendEmail");
			await sendEmail({
				to: "liobensignor@gmail.com",
				subject,
				text,
			}).then((result) => {
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
			});
		},
	},
};
</script>
