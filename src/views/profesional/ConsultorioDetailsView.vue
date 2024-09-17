<template>
	<main class="w-full">
		<Breadcrumb class="breadcrumb" :model="items" />
		<h2 class="mt-3">Consultorio {{ consultorioId }}</h2>
		<p>Sector {{ sectorName }}</p>
		<div class="fechaConsultorio my-4">
			<label for="date">Seleccione una fecha</label>
			<Calendar
				class="w-full"
				v-model="consultorioDate"
				showIcon
				fluid
				iconDisplay="input"
				dateFormat="dd/mm/yy"
				id="date"
			/>
		</div>
		<div class="w-full columnAlignCenter gap-3">
			<div
				v-for="(agenda, index) in currentAgenda"
				class="w-full agenda bg-dark-gray border-round-sm"
				:key="index"
			>
				<div class="rowCenter">
					<div
						class="w-4 py-2"
						:class="agenda.cuil ? 'titleProfesional' : 'titleLibre'"
					>
						<p class="text-blue text-center">
							{{
								agenda.cuil
									? `${
											profesionalStore.profesionales[
												agenda.cuil
											].nombre
									  } ${
											profesionalStore.profesionales[
												agenda.cuil
											].apellido
									  }`
									: "LIBRE"
							}}
						</p>
					</div>
					<div class="w-8 px-3">
						<p class="horarioAgenda text-blue">
							{{ formatTimeRange(agenda.horario) }}
						</p>
					</div>
				</div>
				<div class="px-3 py-2" v-if="agenda.nombre_agenda">
					<p class="nombreAgenda rowCenter gap-2 text-blue">
						Nombre de la agenda:
						<span>"{{ agenda.nombre_agenda }}"</span>
					</p>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
import { useRouter, useRoute } from "vue-router";
import { sectorSearch } from "@/constants/sectorsMap";
import fillTimeRanges from "@/utils/fillTimeRanges";
import { useAgendaStore } from "@/stores/agenda";
import { useProfesionalStore } from "@/stores/profesional";

export default {
	name: "ConsultorioDetailsView",
	data() {
		return {
			route: useRoute(),
			router: useRouter(),
			start_time: "07:00",
			end_time: "20:00",
			agendasConsultorio: null,
			consultorioDate: new Date(),
			agendaStore: useAgendaStore(),
			profesionalStore: useProfesionalStore(),
		};
	},
	methods: {
		formatTimeRange(range) {
			const [start, end] = range.split("-");
			return `${start}hs - ${end}hs`;
		},
		getProfesioanlesData(agendasConsultorio) {
			const cuils = Array.from(
				new Set(
					agendasConsultorio
						.map((agenda) => agenda.cuil)
						.filter((cuil) => !!cuil)
				)
			);
			this.profesionalStore.getProfesionales(cuils);
		},
	},
	async mounted() {
		const agendasConsultorio = await this.agendaStore.getAgendasConsultorio(
			this.sectorId,
			this.consultorioId
		);
		this.agendasConsultorio = agendasConsultorio;
		this.getProfesioanlesData(agendasConsultorio);
	},
	computed: {
		currentAgenda() {
			return this.agendasConsultorio
				? fillTimeRanges(
						this.start_time,
						this.end_time,
						this.agendasConsultorio.filter(
							(ag) => ag.dia === this.consultorioDate.getDay()
						)
				  )
				: [{ horario: "07:00-20:00" }];
		},
		sectorId() {
			return this.route.params.sector_id;
		},
		sectorName() {
			const sectorEntry = Object.entries(sectorSearch).find(
				([, value]) => value === this.sectorId
			);
			return sectorEntry ? sectorEntry[0] : `Sector ${this.sectorId}`;
		},
		consultorioId() {
			return this.route.params.consultorio_id;
		},
		items() {
			return [
				{
					label: "Sectores",
					command: () =>
						this.router.push({ path: ROUTES_NAMES.Sectors }),
				},
				{
					label: `Sector ${this.sectorName}`,
					command: () =>
						this.router.push({
							path: `${ROUTES_NAMES.SectorDetails}/${this.sectorId}`,
						}),
				},
				{
					label: `Consultorio ${this.consultorioId}`,
				},
			];
		},
	},
};
</script>

<style>
.fechaConsultorio .p-calendar .p-inputtext {
	font-weight: 500;
	padding-left: 2.5rem;
}

.fechaConsultorio .p-calendar:not(.p-calendar-disabled).p-focus > .p-inputtext {
	box-shadow: none;
}

.fechaConsultorio .p-calendar .p-icon {
	position: absolute;
	top: 27.5%;
	left: 0.875rem;
	color: var(--color-blue);
}
</style>

<style scoped>
label {
	font-weight: 500;
}

p {
	font-size: 0.75rem;
}

.agenda {
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.titleLibre {
	background-color: rgba(141, 222, 94, 1);
	border-radius: 5px 0 0 5px;
}

.titleLibre p {
	font-weight: 700;
}

.titleProfesional {
	background-color: var(--color-light-blue);
	border-radius: 5px 0 5px 0;
	font-weight: 700;
}

.horarioAgenda {
	font-weight: 700;
}

.nombreAgenda {
	font-size: 0.625rem;
}
</style>
