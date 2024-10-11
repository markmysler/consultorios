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
		<Dialog
			class="w-11 dialogSoporteContainer"
			v-model:visible="supportDialog"
			modal
		>
			<div class="w-full px-2 pb-2">
				<h3 class="text-center">Soporte</h3>
				<FormScheduleComponent
					:sendSupportEmail="submitSupport"
					:asunto="`Error con los horarios de ${this.store.userData.nombre} ${this.store.userData.apellido}`"
				/>
			</div>
		</Dialog>
		<Dialog
			class="w-11 dialogConfirmContainer"
			v-model:visible="confirmDialog"
			modal
			header=""
		>
			<div class="w-full dialogConfirm column gap-3 px-2 pb-2">
				<p>¿Estás seguro de que tus horarios son correctos?</p>
				<p class="pSmall">
					Los horarios que confirmes serán los horarios que quedarán
					en la App.
				</p>
				<div class="w-full rowCenter gap-3">
					<Button
						@click="confirmSchedule"
						label="Si"
						:to="routes.ThanksSchedule"
						class="w-6 h-3rem columnAlignCenter secondaryButtonLink"
					/>

					<Button
						class="w-6 h-3rem primaryButton"
						label="No"
						@click="confirmDialog = false"
					></Button>
				</div>
			</div>
		</Dialog>
	</main>
</template>

<script>
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

import DiaSemanaComponent from "@/components/profesional/DiaSemanaComponent.vue";
import FormScheduleComponent from "@/components/support/FormScheduleComponent.vue";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/init";
import { useToast } from "primevue/usetoast";
import { sendSupportEmail } from "@/utils/sendEmail";

export default {
	name: "ProfesionalDetailsView",
	components: {
		DiaSemanaComponent,
		FormScheduleComponent,
	},
	data() {
		return {
			route: useRoute(),
			router: useRouter(),
			routes: ROUTES_NAMES,
			store: useUserStore(),
			supportDialog: false,
			confirmDialog: false,
		};
	},
	methods: {
		async confirmSchedule() {
			const ref = doc(db, "users", this.store.user.uid);
			await updateDoc(ref, { confirmo_horarios: true })
				.then(() => {
					this.$toast.add({
						severity: "success",
						summary: "Horarios confirmados",
						detail: "Gracias por confirmar los horarios de tus consultorios.",
						life: 3000,
					});

					// const routeTo =
					// 	this.store.route_from || ROUTES_NAMES.ThanksSchedule;
					// this.store.route_from = null;
					this.router.push(ROUTES_NAMES.ThanksSchedule);
				})
				.catch((err) => {
					this.$toast.add({
						severity: "danger",
						summary: "Hubo un error",
						detail: "Intentelo de nuevo más tarde",
						life: 3000,
					});
				});
		},
		async submitSupport(subject, text) {
			this.supportDialog = false;
			sendSupportEmail(subject, text);
		},
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

<style>
.dialogConfirmContainer .p-dialog-header,
.dialogSoporteContainer .p-dialog-header {
	justify-content: flex-end;
}
</style>

<style scoped>
.supportText {
	font-size: 0.875rem;
}

.dialogConfirm p:first-of-type {
	font-size: 0.875rem;
}

.dialogConfirm p:last-of-type {
	font-size: 0.7rem;
}
</style>
Si
