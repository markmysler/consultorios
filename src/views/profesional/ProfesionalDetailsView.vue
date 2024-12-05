<template>
	<main class="w-full" v-if="profesional">
		<h2>{{ profesional.nombre }} {{ profesional.apellido }}</h2>
		<div class="especialidades mt-1">
			<div class="especialidad border-round-md py-1 px-2" v-for="(especialidad, index) in profesional.especialidades"
				:key="index">
				<p class="text-blue">{{ capitalize(especialidad) }}</p>
			</div>
		</div>
		<div v-if="store.userData.role === 'admin'" class="w-full editarBorrar columnAlignCenter">
			<router-link :to="routes.AddProfesionalSchedule" class="primaryButtonLink">
				Editar profesional
			</router-link>
			<Button label="Eliminar profesional" class="deleteBtn" icon="pi pi-trash" iconPos="left"
				@click="dialogEliminar = true" />
		</div>
		<div v-if="agendasAgrupadas && Object.keys(agendasAgrupadas).length > 0"
			class="w-full column gap-3">
			<DiaSemanaComponent :routes="routes" :agendasAgrupadas="agendasAgrupadas" />
		</div>
		<div v-else class="noAgenda columnAlignCenter">
			<p class="text-center text-white">El profesional {{ profesional.nombre }} {{ profesional.apellido }} no tiene
				consultorios asignados.</p>
			<router-link :to="routes.AddProfesionalSchedule" class="text-center text-white">Agregar horarios de
				consultorios.</router-link>
		</div>
		<Dialog class="dialogEliminar" v-model:visible="dialogEliminar">
			
		</Dialog>
	</main>
</template>

<script>
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
import { capitalize } from "vue";
import { useRoute } from "vue-router";

import DiaSemanaComponent from "@/components/profesional/DiaSemanaComponent.vue";
import { useUserStore } from "@/stores/user";
import { useProfesionalStore } from "@/stores/profesional";

export default {
	name: "ProfesionalDetailsView",
	components: {
		DiaSemanaComponent,
	},
	data() {
		return {
			adminsucho: true,
			profesional: null,
			agendasFiltradas: [],
			route: useRoute(),
			routes: ROUTES_NAMES,
			store: useUserStore(),
			profesionalStore: useProfesionalStore(),
			dialogEliminar: false,
		};
	},
	computed: {
		// TODO: Traer datos del profesional usando el cuil del route param
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
			return this.route.params.profesional_id;
		},
	},
	async mounted() {
		this.profesional = await this.profesionalStore.getProfesional(
			this.profCuil
		);
	},
	methods: {
		capitalize,
		openDeleteModal() {
			this.$confirm.require({
				message: '¿Está seguro de que desea eliminar este profesional?',
				header: 'Confirmar eliminación',
				icon: 'pi pi-exclamation-triangle',
				accept: async () => {
					console.log("Eliminar profesional");
					
				},
			});
		}
	},
};
</script>

<style scoped>
.especialidad {
	border: 1px solid var(--color-blue);
}

.especialidad p {
	font-size: 0.625rem;
	font-weight: 600;
}

.editarBorrar {
	gap: 0.625rem;
	margin: 1.25rem 0 0.625rem 0;
}

.deleteBtn {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	background: none;
	border: none;
	color: var(--color-red);
	font-size: 0.875rem;
	padding: 0.625rem 0.313rem;
}

.noAgenda {
	max-width: 260px;
	gap: 0.625rem;
	background-color: var(--color-red);
	border-radius: 5px;
	padding: 0.5rem 0.875rem;
}

.noAgenda p,
.noAgenda a {
	font-size: 0.75rem;
}
</style>