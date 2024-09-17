<template>
	<main class="w-full" v-if="store.userData">
		<h2>{{ store.userData.nombre }} {{ store.userData.apellido }}</h2>
		<p class="supportText mt-1">
			Por única vez, confirma que los horarios de tus consultorios sean
			correctos. Si reconoces un error, por favor comunícalo en
			<span
				@click="supportDialog = true"
				class="text-blue underline cursor-pointer"
				>Soporte</span
			>.
		</p>
		<div class="w-full column gap-3 my-3">
			<DiaSemanaComponent
				:routes="routes"
				:agendasAgrupadas="agendasAgrupadas"
			/>
		</div>
		<Button
			@click="confirmDialog = true"
			label="Confirmar mis horarios"
			class="primaryButton"
		/>
		<Dialog class="dialogLicencias w-11" v-model:visible="supportDialog">
			<div class="w-full px-2 pb-2">
				<h3 class="text-center">Soporte</h3>
				<FormSupportComponentVue :opcionesAsuntos="opcionesAsuntos" />
			</div>
		</Dialog>
	</main>
</template>

<script>
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";

import DiaSemanaComponent from "@/components/profesional/DiaSemanaComponent.vue";
import FormSupportComponentVue from "@/components/support/FormSupportComponent.vue";

export default {
	name: "ProfesionalDetailsView",
	components: {
		DiaSemanaComponent,
		FormSupportComponentVue,
	},
	data() {
		return {
			route: useRoute(),
			routes: ROUTES_NAMES,
			store: useUserStore(),
			supportDialog: false,
			confirmDialog: false,
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
	computed: {
		agendasAgrupadas() {
			const agendasPorDia = {};
			if (this.store.userAgendas) {
				this.store.userAgendas.forEach((agenda) => {
					if (!agendasPorDia[agenda.dia]) {
						agendasPorDia[agenda.dia] = [];
					}
					agendasPorDia[agenda.dia].push(agenda);
				});
			}

			return agendasPorDia;
		},
		profCuil() {
			return this.store.userData.cuil;
		},
	},
};
</script>

<style scoped>
.supportText {
	font-size: 0.875rem;
}
</style>
