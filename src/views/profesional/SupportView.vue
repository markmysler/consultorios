<template>
	<main class="w-full">
		<h2>Soporte</h2>
		<FormSupportComponentVue
			:opcionesAsuntos="opcionesAsuntos"
			:sendSupportEmail="submitSupport"
		/>
	</main>
</template>

<script>
import FormSupportComponentVue from "@/components/support/FormSupportComponent.vue";
import { useUserStore } from "@/stores/user";
import { sendSupportEmail } from "@/utils/sendEmail";

export default {
	name: "SupportView",
	components: {
		FormSupportComponentVue,
	},
	data() {
		return {
			store: useUserStore(),
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
		async submitSupport(subject, text) {
			const formated = `${subject} - ${this.store.userData.nombre} ${this.store.userData.apellido}`;
			sendSupportEmail(formated, text);
		},
	},
};
</script>
