<template>
	<main class="w-full column">
		<h2>Buscar por:</h2>
		<TabView class="w-full">
			<TabPanel header="Profesional">
				<form class="pt-3" @submit.prevent="searchProf">
					<IconField class="searchInput">
						<InputIcon class="text-blue pi pi-search" />
						<InputText
							placeholder="Nombre, Apellido, CUIL"
							class="i"
							v-model="profesional.input"
						/>
					</IconField>
					<div class="accordions pt-2">
						<Accordion
							class="accordionEspecialidad"
							expand-icon="pi pi-plus"
							collapse-icon="pi pi-minus"
						>
							<AccordionTab header="Especialidad">
								<Dropdown
									class="w-full"
									v-model="profesional.especialidad"
									placeholder="Seleccione una especialidad"
									:options="especialidades"
									filter
									showClear
								/>
							</AccordionTab>
						</Accordion>
						<Accordion
							class="accordionEspecialidad"
							expand-icon="pi pi-plus"
							collapse-icon="pi pi-minus"
						>
							<AccordionTab header="Subespecialidad">
								<Dropdown
									class="w-full"
									v-model="profesional.subespecialidad"
									placeholder="Seleccione una subespecialidad"
									:options="subespecialidades"
									filter
									showClear
								/>
							</AccordionTab>
						</Accordion>
						<Accordion
							expand-icon="pi pi-plus"
							collapse-icon="pi pi-minus"
						>
							<AccordionTab header="Turno">
								<div class="checkboxes rowCenter">
									<div class="rowCenter gap-1">
										<Checkbox
											v-model="profesional.turno"
											inputId="matutino"
											name="turno"
											value="matutino"
										/>
										<label class="text-blue" for="matutino"
											>Matutino</label
										>
									</div>
									<div class="rowCenter gap-1">
										<Checkbox
											v-model="profesional.turno"
											inputId="vespertino"
											name="turno"
											value="vespertino"
										/>
										<label
											class="text-blue"
											for="vespertino"
											>Vespertino</label
										>
									</div>
								</div>
							</AccordionTab>
						</Accordion>
						<Accordion
							expand-icon="pi pi-plus"
							collapse-icon="pi pi-minus"
						>
							<AccordionTab header="Especificar horario laboral">
								<div class="rowCenter gap-6">
									<div class="rowCenter gap-1">
										<RadioButton
											v-model="profesional.horarioLaboral"
											inputId="si"
											name="horarioLaboral"
											value="si"
										/>
										<label class="text-blue" for="si"
											>Si</label
										>
									</div>
									<div class="rowCenter gap-1">
										<RadioButton
											v-model="profesional.horarioLaboral"
											inputId="no"
											name="horarioLaboral"
											value="no"
										/>
										<label for="no">No</label>
									</div>
								</div>
							</AccordionTab>
						</Accordion>
						<Accordion
							v-if="profesional.horarioLaboral === 'si'"
							expand-icon="pi pi-plus"
							collapse-icon="pi pi-minus"
						>
							<AccordionTab header="Horario Laboral">
								<div class="rowCenter gap-2">
									<Calendar
										v-model="profesional.fecha"
										showIcon
										fluid
										iconDisplay="input"
										dateFormat="dd/mm/yy"
										id="date"
									/>
									<Calendar
										v-model="profesional.horario"
										showIcon
										fluid
										timeOnly
										iconDisplay="input"
										id="time"
									>
										<template #inputicon="slotProps">
											<i
												class="pi pi-clock"
												@click="slotProps.clickCallback"
											/>
										</template>
									</Calendar>
								</div>
							</AccordionTab>
						</Accordion>
					</div>
					<div class="error mt-3" v-if="showError">
						<span class="pi pi-exclamation-circle"></span>
						<p>Complete al menos un campo antes de buscar.</p>
					</div>
					<Button
						:loading="loading"
						class="primaryButton mt-3"
						label="Buscar"
						type="submit"
					></Button>
				</form>
			</TabPanel>
			<TabPanel header="Consultorio">
				<form class="pt-3" @submit.prevent="searchCons">
					<IconField class="searchInput mb-2">
						<InputIcon class="text-blue pi pi-search" />
						<InputText
							placeholder="Nombre de Agenda"
							class="i"
							v-model="consultorio.input"
						/>
					</IconField>
					<div class="rowCenter gap-2">
						<Dropdown
							class="w-full dropDownSector"
							v-model="consultorio.sector"
							placeholder="Sector"
							:options="Object.keys(sectors)"
							showClear
						/>
						<Dropdown
							class="w-full dropDownNumero"
							v-model="consultorio.numero"
							placeholder="Número"
							:options="consultorios[sectors[consultorio.sector]]"
							showClear
						/>
					</div>
					<div class="accordions pt-2">
						<Accordion
							class="accordionEspecialidad"
							expand-icon="pi pi-plus"
							collapse-icon="pi pi-minus"
						>
							<AccordionTab header="Especialidad">
								<Dropdown
									class="w-full"
									v-model="consultorio.especialidad"
									placeholder="Seleccione una especialidad"
									:options="especialidades"
									filter
									showClear
									:disabled="isEspecialidadDisabled"
									@change="onEspecialidadChange"
								/>
								<small
									v-if="
										consultorio.disponibilidad === 'libre'
									"
									class="text-disabled mt-1 block"
								>
									Si elige buscar por un consultorio libre, no
									puedes elegir una especialidad
								</small>
							</AccordionTab>
						</Accordion>
						<Accordion
							expand-icon="pi pi-plus"
							collapse-icon="pi pi-minus"
						>
							<AccordionTab header="Disponibilidad">
								<div class="w-full rowCenter gap-6">
									<div class="rowCenter gap-1">
										<RadioButton
											v-model="consultorio.disponibilidad"
											inputId="ocupado"
											name="disponibilidad"
											value="ocupado"
										/>

										<label
											for="ocupado"
											:class="
												getDisponibilidadLabelClass(
													'ocupado'
												)
											"
											>Ocupado</label
										>
									</div>
									<div class="rowCenter gap-1">
										<RadioButton
											v-model="consultorio.disponibilidad"
											inputId="libre"
											name="disponibilidad"
											value="libre"
										/>

										<label
											for="libre"
											:class="
												getDisponibilidadLabelClass(
													'libre'
												)
											"
											>Libre</label
										>
									</div>
									<button
										class="btnCruz"
										v-if="
											!consultorio.especialidad &&
											consultorio.disponibilidad
										"
										@click="consultorio.disponibilidad = ''"
									>
										X
									</button>
								</div>
								<small
									v-if="consultorio.especialidad"
									class="text-disabled mt-1 block"
								>
									Si elige buscar por una especialidad, no
									puedes elegir un consultorio libre
								</small>
							</AccordionTab>
						</Accordion>
						<Accordion
							v-if="consultorio.disponibilidad.length > 0"
							expand-icon="pi pi-plus"
							collapse-icon="pi pi-minus"
						>
							<AccordionTab header="Fecha y hora">
								<div class="rowCenter gap-2">
									<Calendar
										v-model="consultorio.fecha"
										showIcon
										fluid
										iconDisplay="input"
										dateFormat="dd/mm/yy"
										id="date"
									/>
									<Calendar
										v-model="consultorio.horario"
										showIcon
										fluid
										timeOnly
										iconDisplay="input"
										id="time"
									>
										<template #inputicon="slotProps">
											<i
												class="pi pi-clock"
												@click="slotProps.clickCallback"
											/>
										</template>
									</Calendar>
								</div>
							</AccordionTab>
						</Accordion>
					</div>
					<div class="error mt-3" v-if="showError">
						<span class="pi pi-exclamation-circle"></span>
						<p>Complete al menos un campo antes de buscar.</p>
					</div>
					<Button
						:loading="loading"
						class="primaryButton mt-3"
						label="Buscar"
						type="submit"
					></Button>
				</form>
			</TabPanel>
		</TabView>
		<div
			class="results column"
			v-if="searchResponse !== null && searchResponse.length !== 0"
		>
			<router-link
				v-for="(resultado, index) in searchResponse"
				:key="index"
				class="w-full resultado column bg-dark-gray no-underline"
				:to="routes.ProfesionalDetails + '/' + resultado.cuil"
			>
				<div class="rowCenter">
					<div class="w-5 bg-light-blue py-2 px-3">
						<p
							class="text-blue font-bold"
							v-html="
								resultado._highlightResult.nombre.value +
								' ' +
								resultado._highlightResult.apellido.value
							"
						></p>
					</div>
					<div class="w-8 bg-dark-gray py-2 px-3">
						<p
							class="text-blue font-bold"
							v-html="resultado._highlightResult.cuil.value"
						></p>
					</div>
				</div>
				<div class="bg-dark-gray">
					<p
						class="text-blue font-bold"
						v-html="
							resultado._highlightResult.especialidades
								.map((e) => capitalize(e.value))
								.join(', ')
						"
					></p>
					<p
						class="text-blue font-bold"
						v-html="
							resultado._highlightResult.subespecialidades
								.map((s) => capitalize(s.value))
								.join(', ')
						"
					></p>
				</div>
			</router-link>
		</div>
		<div
			class="results"
			v-else-if="searchResponse !== null && searchResponse.length === 0"
		>
			<div class="noResultados bg-red border-round-md px-3 py-2">
				<p class="text-center text-white">
					No hay resultados para tu búsqueda.
				</p>
				<p class="text-center text-white">
					Pruebe de nuevo con otros filtros.
				</p>
			</div>
		</div>
	</main>
</template>

<script>
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
import { sectorSearch } from "@/constants/sectorsMap.js";
import { consultorios } from "@/constants/models";
import { especialidades, subespecialidades } from "@/constants/especialidades";
import { searchProfessional } from "@/utils/searchProfessionalFS";
import { capitalize } from "vue";
import { searchConsultorio } from "@/utils/searchConsultorio";

export default {
	name: "SearchView",
	data() {
		return {
			routes: ROUTES_NAMES,
			loading: false,
			showError: false,
			sectors: sectorSearch,
			consultorios: consultorios,
			especialidades: especialidades,
			subespecialidades: subespecialidades,
			profesional: {
				input: "",
				especialidad: null,
				subespecialidad: null,
				turno: null,
				horarioLaboral: "no",
				fecha: new Date(),
				horario: new Date(),
			},
			consultorio: {
				input: "",
				sector: null,
				numero: null,
				especialidad: null,
				disponibilidad: "",
				fecha: new Date(),
				horario: new Date(),
			},
			searchResponse: null,
		};
	},
	methods: {
		onEspecialidadChange() {
			if (this.consultorio.especialidad) {
				this.consultorio.disponibilidad = "ocupado";
			} else {
				this.consultorio.disponibilidad = "";
			}
		},

		isDisponibilidadDisabled(value) {
			if (value === "libre") {
				return !!this.consultorio.especialidad;
			}
			return false;
		},

		getDisponibilidadLabelClass(value) {
			if (this.isDisponibilidadDisabled(value)) {
				return "text-disabled";
			}
			return this.consultorio.disponibilidad === value ? "text-blue" : "";
		},

		onDisponibilidadChange(value) {
			if (this.consultorio.disponibilidad === value) {
				this.consultorio.disponibilidad = "";
			} else {
				this.consultorio.disponibilidad = value;
			}

			if (value === "libre") {
				this.consultorio.especialidad = null;
			}
		},

		isFormEmpty(formData) {
			const isDefaultDate = (date) => {
				const defaultDate = new Date();
				return (
					date.getDate() === defaultDate.getDate() &&
					date.getMonth() === defaultDate.getMonth() &&
					date.getFullYear() === defaultDate.getFullYear()
				);
			};

			const isDefaultTime = (time) => {
				const defaultTime = new Date();
				return (
					time.getHours() === defaultTime.getHours() &&
					time.getMinutes() === defaultTime.getMinutes()
				);
			};

			return Object.entries(formData).every(([key, value]) => {
				if (key === "horarioLaboral" && value === "no") return true;
				if (key === "fecha" && isDefaultDate(value)) return true;
				if (key === "horario" && isDefaultTime(value)) return true;
				if (key === "disponibilidad" && value)
					return value.length === 0;
				return value === "" || value === null || value.length === 0;
			});
		},

		async searchProf() {
			if (this.isFormEmpty(this.profesional)) {
				this.showError = true;
				return;
			}

			this.showError = false;
			this.loading = true;

			const search = {
				input_text: this.profesional.input,
				subspecialty: this.profesional.subespecialidad
					? this.profesional.subespecialidad
							.toLowerCase()
							.normalize("NFD")
							.replace(/[\u0300-\u036f]/g, "")
					: null,
				specialty: this.profesional.especialidad
					? this.profesional.especialidad
							.toLowerCase()
							.normalize("NFD")
							.replace(/[\u0300-\u036f]/g, "")
					: null,
				shift:
					this.profesional.turno &&
					this.profesional.turno.length !== 0
						? [...this.profesional.turno]
						: null,
				date_string:
					this.profesional.fecha &&
					this.profesional.horarioLaboral === "si"
						? this.profesional.fecha.toLocaleDateString("en-US")
						: null,
				time:
					this.profesional.horario &&
					this.profesional.horarioLaboral === "si"
						? `${this.profesional.horario.getHours()}:${this.profesional.horario.getMinutes()}`
						: null,
			};
			this.searchResponse = await searchProfessional(search);
			console.log(this.searchResponse);

			this.loading = false;
		},

		async searchCons() {
			if (this.isFormEmpty(this.consultorio)) {
				this.showError = true;
				return;
			}

			this.showError = false;
			this.loading = true;
			const input = {
				input: this.consultorio.input,
				sector: this.consultorio.sector,
				numero: this.consultorio.numero,
				especialidad: this.consultorio.especialidad
					? this.consultorio.especialidad
							.toLowerCase()
							.normalize("NFD")
							.replace(/[\u0300-\u036f]/g, "")
					: null,
				disponibilidad: this.consultorio.disponibilidad,
				fecha:
					this.consultorio.disponibilidad ||
					this.consultorio.especialidad
						? this.consultorio.fecha.toJSON().split("T")[0]
						: null,
				horario:
					this.consultorio.disponibilidad ||
					this.consultorio.especialidad
						? `${this.consultorio.horario
								.getHours()
								.toString()
								.padStart(2, "0")}:${this.consultorio.horario
								.getMinutes()
								.toString()
								.padStart(2, "0")}`
						: null,
			};

			const res = await searchConsultorio(input);
			console.log(res);

			this.loading = false;
		},

		capitalize,
	},
	computed: {
		isEspecialidadDisabled() {
			return this.consultorio.disponibilidad === "libre";
		},
	},
	watch: {
		"consultorio.especialidad"(newValue) {
			if (newValue) {
				this.consultorio.disponibilidad = "ocupado";
			} else {
				this.consultorio.disponibilidad = "";
			}
		},
		// "consultorio.disponibilidad"(newValue) {
		// 	if (this.consultorio.disponibilidad === newValue) {
		// 		this.consultorio.disponibilidad = "";
		// 	} else {
		// 		this.consultorio.disponibilidad = newValue;
		// 	}

		// 	if (newValue === "libre") {
		// 		this.consultorio.especialidad = null;
		// 	}
		// },
	},
};
</script>

<style>
/* Tabs */
.p-tabview {
	max-width: 400px;
}

/* Search + Icon */

.searchInput .p-input-icon {
	top: 27.5%;
	left: 0.625rem;
	right: auto;
}

.searchInput .p-inputtext {
	font-weight: 600;
	padding-left: 2.188rem;
}

.accordions .p-inputtext {
	font-weight: 600;
}

.accordions .p-accordion-header-text {
	font-size: 0.875rem;
}

.accordionEspecialidad .p-inputtext,
.dropDownSector .p-inputtext,
.dropDownNumero .p-inputtext {
	color: var(--color-blue);
}

/* Checkbox */

.checkboxes {
	gap: 3.125rem;
}

.checkboxes label {
	font-size: 0.75rem;
	font-weight: 700;
}

.accordions .p-checkbox .p-checkbox-box {
	width: 1.125rem;
	height: 1.125rem;
	background: var(--color-gray);
	border: 1px solid var(--color-blue);
	border-radius: 5px;
}

.accordions .p-checkbox.p-highlight .p-checkbox-box {
	background: var(--color-blue);
}

.accordions .p-calendar .p-inputtext {
	color: var(--color-blue);
	padding-left: 2.25rem;
}

.accordions .p-calendar .p-datepicker-trigger-icon,
.accordions .pi-clock {
	font-size: 1rem;
	position: absolute;
	top: 27.5%;
	left: 0.688rem;
	color: var(--color-blue);
}

/* Radio */

.accordions .p-radiobutton.p-highlight .p-radiobutton-box {
	border-color: var(--color-blue);
	background: var(--color-blue);
}

* > em {
	background-color: yellow !important;
}
</style>

<style scoped>
main {
	gap: 1.25rem;
}

.btnCruz {
	align-self: flex-end;
	border: none;
	background: none;
	color: var(--color-blue);
	font-weight: bold;
	cursor: pointer;
}

.results {
	width: 100%;
	gap: 0.75rem;
	border-top: 1px solid #777777;
	padding-top: 1.25rem;
}

.resultado {
	border-radius: 5px;
	box-shadow: 0px 4px 4px 0px #00000040;
}

.resultado > div:first-of-type > div:first-of-type {
	border-top-left-radius: 5px;
	border-bottom-right-radius: 5px;
}

.resultado > div:first-of-type > div:last-of-type {
	border-top-right-radius: 5px;
}

.resultado > div:last-of-type {
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
	padding: 0.5rem 1rem;
}

.resultado p,
.noResultados p {
	font-size: 0.75rem;
}
</style>
