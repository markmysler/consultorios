<template>
	<main class="w-full" v-if="profesional">
		<h2>{{ profesional.nombre }} {{ profesional.apellido }}</h2>
		<div class="especialidades mt-1">
			<div
				class="especialidad border-round-md py-1 px-2"
				v-for="(especialidad, index) in profesional.especialidades"
				:key="index"
			>
				<p class="text-blue">{{ capitalize(especialidad) }}</p>
			</div>
		</div>
		<div class="w-full column gap-3">
			<div
				class="column gap-2"
				v-for="(agendasPorDia, dia) in agendasAgrupadas"
				:key="dia"
			>
				<p class="diaSemana text-blue">{{ diasSemana[dia] }}</p>
				<router-link
					v-for="agenda in agendasPorDia"
					:key="agenda.horario"
					class="agenda bg-dark-gray border-round-md mb-1"
					:to="
						routes.ConsultorioDetails +
						'/' +
						agenda.consultorio.sector +
						'/' +
						agenda.consultorio.nombre
					"
				>
					<div class="rowCenter">
						<div class="sector bg-light-blue py-2 px-3">
							<p class="agendaText text-blue">
								Sector {{ agenda.consultorio.sector }}
								{{ agenda.consultorio.nombre }}
							</p>
						</div>
						<div class="py-2 px-3">
							<p class="agendaText text-blue">
								{{ agenda.horario }}
							</p>
						</div>
					</div>
					<div class="nombreAgenda py-2 px-3">
						<p class="text-blue">
							Nombre de la agenda: "{{ agenda.nombre_agenda }}"
						</p>
					</div>
				</router-link>
			</div>
		</div>
	</main>
</template>

<script>
import { profesionales, agendas } from "@/constants/models.js";
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
import { capitalize } from "vue";
import { useRoute } from "vue-router";

export default {
	name: "ProfesionalDetailsView",
	data() {
		return {
			profesional: null,
			agendasFiltradas: [],
			diasSemana: {
				1: "Lunes",
				2: "Martes",
				3: "Miércoles",
				4: "Jueves",
				5: "Viernes",
				6: "Sábado",
			},
			route: useRoute(),
			routes: ROUTES_NAMES,
		};
	},
	computed: {
		agendasAgrupadas() {
			const agendasPorDia = {};

			this.agendasFiltradas.forEach((agenda) => {
				if (!agendasPorDia[agenda.dia]) {
					agendasPorDia[agenda.dia] = [];
				}
				agendasPorDia[agenda.dia].push(agenda);
			});

			return agendasPorDia;
		},
		profCuil() {
			return this.route.params.profesional_id;
		},
	},
	mounted() {
		this.getProfessional();
		this.filtrarAgendas();
	},
	methods: {
		capitalize,
		filtrarAgendas() {
			this.agendasFiltradas = agendas.filter(
				(agenda) => agenda.cuil === this.profesional.cuil
			);
		},
		getProfessional() {
			this.profesional = profesionales.find(
				(prof) => prof.cuil === Number(this.profCuil)
			);
		},
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

.agenda {
	box-shadow: 0px 4px 4px 0px #00000040;
}

.diaSemana {
	font-size: 0.875rem;
	font-weight: 800;
	line-height: 18.23px;
}

.agendaText {
	font-size: 0.75rem;
	font-weight: 700;
	line-height: 15.62px;
}

.sector {
	border-top-left-radius: 0.375rem;
	border-bottom-right-radius: 0.375rem;
}

.nombreAgenda p {
	font-size: 0.625rem;
	line-height: 13.02px;
}
</style>
