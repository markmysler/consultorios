<template>
	<main class="w-full">
		<h2>Agregar nuevo profesional</h2>
		<Stepper class="stepperProfesional w-full h-full bg-gray">
			<!-- Paso 1 -->
			<StepperPanel class="h-full columnSpaceBetween">
				<template #content="{ nextCallback }">
					<div class="stepContent column">
						<div>
							<label for="nombre">Nombre</label>
							<InputText
								placeholder="Ingrese un nombre"
								id="nombre"
								v-model="profesional.nombre"
							/>
							<div
								class="error mt-1"
								v-if="validationErrors.nombre"
							>
								<span class="pi pi-exclamation-circle"></span>
								<p>{{ validationErrors.nombre }}</p>
							</div>
						</div>
						<div>
							<label for="apellido">Apellido</label>
							<InputText
								placeholder="Ingrese un apellido"
								id="apellido"
								v-model="profesional.apellido"
							/>
							<div
								class="error mt-1"
								v-if="validationErrors.apellido"
							>
								<span class="pi pi-exclamation-circle"></span>
								<p>{{ validationErrors.apellido }}</p>
							</div>
						</div>
						<div class="column">
							<label for="cuil">CUIL</label>
							<InputNumber
								placeholder="Ingrese un cuil"
								id="cuil"
								:useGrouping="false"
								v-model="profesional.cuil"
							/>
							<div
								class="error mt-1"
								v-if="validationErrors.cuil"
							>
								<span class="pi pi-exclamation-circle"></span>
								<p>{{ validationErrors.cuil }}</p>
							</div>
						</div>
						<div>
							<label for="email">Correo electrónico</label>
							<InputText
								placeholder="Ingrese un correo electrónico"
								id="email"
								v-model="profesional.email"
							/>
							<div
								class="error mt-1"
								v-if="validationErrors.email"
							>
								<span class="pi pi-exclamation-circle"></span>
								<p>{{ validationErrors.email }}</p>
							</div>
						</div>
					</div>
					<div class="column align-items-end">
						<Button
							label="Continuar"
							class="w-7 primaryButton px-3"
							icon="pi pi-arrow-right"
							iconPos="right"
							@click="validarInformacion(nextCallback)"
						/>
					</div>
				</template>
			</StepperPanel>
			<!-- Paso 2 -->
			<StepperPanel class="h-full columnSpaceBetween">
				<template #content="{ nextCallback, prevCallback }">
					<div class="stepContent column">
						<div>
							<label for="especialidades">Especialidad</label>
							<MultiSelect
								id="especialidades"
								v-model="profesional.especialidades"
								:options="especialidades"
								placeholder="Seleccione una especialidad"
								class="w-full"
							/>
							<div
								class="error mt-1"
								v-if="validationErrors.especialidades"
							>
								<span class="pi pi-exclamation-circle"></span>
								<p>{{ validationErrors.especialidades }}</p>
							</div>
						</div>
						<div>
							<label for="subespecialidades"
								>Subespecialidad</label
							>
							<MultiSelect
								id="subespecialidades"
								v-model="profesional.subespecialidades"
								:options="subespecialidades"
								placeholder="Seleccione una subespecialidad"
								class="w-full"
							/>
							<div
								class="error mt-1"
								v-if="validationErrors.subespecialidades"
							>
								<span class="pi pi-exclamation-circle"></span>
								<p>{{ validationErrors.subespecialidades }}</p>
							</div>
						</div>
					</div>
					<div class="rowSpaceBetween">
						<Button
							aria-label="Atrás"
							icon="pi pi-arrow-left"
							class="btnAtras"
							@click="prevCallback()"
						/>
						<Button
							label="Continuar"
							class="w-7 primaryButton px-3"
							icon="pi pi-arrow-right"
							iconPos="right"
							@click="validarProfesion(nextCallback)"
						/>
					</div>
				</template>
			</StepperPanel>
			<!-- Paso 3 -->
			<StepperPanel class="h-full columnSpaceBetween">
				<template #content="{ nextCallback, prevCallback }">
					<div class="stepContent column">
						<div>
							<label for="jefesReporta"
								>Jefe al que reporta</label
							>
							<MultiSelect
								id="jefesReporta"
								v-model="profesional.jefesReporta"
								:options="jefes"
								placeholder="Seleccione un jefe al que reporta"
								class="w-full"
							/>
							<div
								class="error mt-1"
								v-if="validationErrors.jefesReporta"
							>
								<span class="pi pi-exclamation-circle"></span>
								<p>{{ validationErrors.jefesReporta }}</p>
							</div>
						</div>
						<div>
							<label for="jefesReporta">Turno</label>
							<div class="checkboxes rowCenter">
								<div class="rowCenter gap-1">
									<Checkbox
										v-model="profesional.turnos"
										inputId="matutino"
										name="turno"
										value="matutino"
									/>
									<label for="matutino">Matutino</label>
								</div>
								<div class="rowCenter gap-1">
									<Checkbox
										v-model="profesional.turnos"
										inputId="vespertino"
										name="turno"
										value="vespertino"
									/>
									<label for="vespertino">Vespertino</label>
								</div>
							</div>
							<div
								class="error mt-1"
								v-if="validationErrors.turnos"
							>
								<span class="pi pi-exclamation-circle"></span>
								<p>{{ validationErrors.turnos }}</p>
							</div>
						</div>
						<div>
							<label for="tipoAgenda">Tipo de agenda</label>
							<Dropdown
								class="w-full"
								id="tipoAgenda"
								v-model="profesional.tipoAgenda"
								placeholder="Seleccione un tipo de agenda"
								:options="tiposAgenda"
								showClear
							/>
							<div
								class="error mt-1"
								v-if="validationErrors.tipoAgenda"
							>
								<span class="pi pi-exclamation-circle"></span>
								<p>{{ validationErrors.tipoAgenda }}</p>
							</div>
						</div>
					</div>
					<div class="rowSpaceBetween">
						<Button
							aria-label="Atrás"
							icon="pi pi-arrow-left"
							class="btnAtras"
							@click="prevCallback()"
						/>
						<Button
							label="Continuar"
							class="w-7 primaryButton px-3"
							icon="pi pi-arrow-right"
							iconPos="right"
							@click="validarAgenda(nextCallback)"
						/>
					</div>
				</template>
			</StepperPanel>
			<!-- Paso 4 -->
			<StepperPanel>
				<template #content="{ prevCallback }">
					<div>
						<div class="w-full column gap-2 datosContainer py-2">
							<div class="column gap-1">
								<p>Nombre</p>
								<p class="datos text-blue">
									{{ profesional.nombre }}
								</p>
							</div>
							<div class="column gap-1">
								<p>Apellido</p>
								<p class="datos text-blue">
									{{ profesional.apellido }}
								</p>
							</div>
							<div class="column gap-1">
								<p>CUIL</p>
								<p class="datos text-blue">
									{{ profesional.cuil }}
								</p>
							</div>
							<div class="column gap-1">
								<p>Correo electrónico</p>
								<p class="datos text-blue">
									{{ profesional.email }}
								</p>
							</div>
						</div>
						<div
							class="w-full column gap-2 especialidadesContainer datosContainer py-2"
						>
							<div class="column gap-1">
								<p>Especialidad</p>
								<p class="datos text-blue">
									{{
										formatearLista(
											profesional.especialidades
										)
									}}
								</p>
							</div>
							<div class="column gap-1">
								<p>Subespecialidad</p>
								<p class="datos text-blue">
									{{
										formatearLista(
											profesional.subespecialidades
										)
									}}
								</p>
							</div>
						</div>
						<div class="w-full column gap-2 datosContainer py-2">
							<div class="column gap-1">
								<p>Jefe al que reporta</p>
								<p class="datos text-blue">
									{{
										formatearLista(profesional.jefesReporta)
									}}
								</p>
							</div>
							<div class="column gap-1">
								<p>Turno</p>
								<p class="datos text-blue">
									{{ formatearLista(profesional.turnos) }}
								</p>
							</div>
							<div class="column gap-1">
								<p>Tipo de agenda</p>
								<p class="datos text-blue">
									{{ profesional.tipoAgenda }}
								</p>
							</div>
						</div>
					</div>

					<div class="w-full rowSpaceBetween gap-3">
						<Button
							aria-label="Atrás"
							icon="pi pi-arrow-left"
							class="btnAtras"
							@click="prevCallback"
						/>
						<Button
							class="primaryButton"
							label="Confirmar datos"
							@click="agregarProfesional"
						/>
					</div>
				</template>
			</StepperPanel>
		</Stepper>
	</main>
</template>

<script>
import { especialidades } from "@/constants/especialidades";
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
import { functions } from "@/firebase/init";
import { httpsCallable } from "firebase/functions";
import { useRouter } from "vue-router";

export default {
	name: "AddLicenciaView",
	data() {
		return {
			router: useRouter(),
			profesional: {
				nombre: "",
				apellido: "",
				cuil: null,
				email: "",
				especialidades: [],
				subespecialidades: [],
				jefesReporta: [],
				turnos: [],
				tipoAgenda: "",
			},
			validationErrors: {
				nombre: null,
				apellido: null,
				cuil: null,
				email: null,
				especialidades: null,
				subespecialidades: null,
				jefesReporta: null,
				turnos: null,
				tipoAgenda: null,
			},
			especialidades: especialidades,
			subespecialidades: [
				"Traumatologia 1",
				"Traumatologia 2",
				"Traumatologia 3",
				"Traumatologia 4",
				"Traumatologia 5",
			],
			jefes: [
				"Lali Espósito",
				"Nicky Nicole",
				"Maria Becerra",
				"Emilia Mernes",
			],
			tiposAgenda: ["Omnicanal", "PAI"],
		};
	},
	methods: {
		validarInformacion(nextCallback) {
			this.validarNombre();
			this.validarApellido();
			this.validarCuil();
			this.validarEmail();
			if (
				!this.validationErrors.nombre &&
				!this.validationErrors.apellido &&
				!this.validationErrors.cuil &&
				!this.validationErrors.email
			) {
				nextCallback();
			}
		},
		validarProfesion(nextCallback) {
			this.validarEspecialidad();
			this.validarSubespecialidad();
			if (
				!this.validationErrors.especialidades &&
				!this.validationErrors.subespecialidades
			) {
				nextCallback();
			}
		},
		validarAgenda(nextCallback) {
			this.validarJefesReporta();
			this.validarTurnos();
			this.validarTipoAgenda();
			if (
				!this.validationErrors.jefesReporta &&
				!this.validationErrors.turnos &&
				!this.validationErrors.tipoAgenda
			) {
				nextCallback();
			}
		},
		validarNombre() {
			let nombre = this.profesional.nombre;
			if (!nombre) {
				this.validationErrors.nombre = "Debes ingresar un nombre";
			} else if (nombre.length < 2) {
				this.validationErrors.nombre =
					"El nombre debe tener al menos 2 caracteres";
			} else {
				this.validationErrors.nombre = null;
			}
		},
		validarApellido() {
			let apellido = this.profesional.apellido;
			if (!apellido) {
				this.validationErrors.apellido = "Debes ingresar un apellido";
			} else if (apellido.length < 2) {
				this.validationErrors.apellido =
					"El apellido debe tener al menos 2 caracteres";
			} else {
				this.validationErrors.apellido = null;
			}
		},
		validarCuil() {
			let cuil = this.profesional.cuil;
			if (!cuil) {
				this.validationErrors.cuil = "Debes ingresar un CUIL";
			} else if (cuil < 2) {
				this.validationErrors.cuil =
					"El CUIL debe tener al menos 2 caracteres";
			} else {
				this.validationErrors.cuil = null;
			}
		},
		validarEmail() {
			let email = this.profesional.email;
			let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!email) {
				this.validationErrors.email =
					"Debes ingresar un correo electrónico";
			} else if (!emailRegex.test(email)) {
				this.validationErrors.email =
					"El correo electrónico debe contener un @ y un punto (.)";
			} else {
				this.validationErrors.email = null;
			}
		},
		validarEspecialidad() {
			let especialidades = this.profesional.especialidades;
			if (especialidades.length === 0) {
				this.validationErrors.especialidades =
					"Debes seleccionar al menos una especialidad";
			} else {
				this.validationErrors.especialidades = null;
			}
		},
		validarSubespecialidad() {
			let subespecialidades = this.profesional.subespecialidades;
			if (subespecialidades.length === 0) {
				this.validationErrors.subespecialidades =
					"Debes seleccionar al menos una subespecialidad";
			} else {
				this.validationErrors.subespecialidades = null;
			}
		},
		validarJefesReporta() {
			let jefesReporta = this.profesional.jefesReporta;
			if (jefesReporta.length === 0) {
				this.validationErrors.jefesReporta =
					"Debes seleccionar un jefe al que reporta";
			} else {
				this.validationErrors.jefesReporta = null;
			}
		},
		validarTurnos() {
			let turnos = this.profesional.turnos;
			if (turnos.length === 0) {
				this.validationErrors.turnos =
					"Debes seleccionar al menos un turno";
			} else {
				this.validationErrors.turnos = null;
			}
		},
		validarTipoAgenda() {
			let tipoAgenda = this.profesional.tipoAgenda;
			if (!tipoAgenda) {
				this.validationErrors.tipoAgenda =
					"Debes seleccionar un tipo de agenda";
			} else {
				this.validationErrors.tipoAgenda = null;
			}
		},
		formatearLista(array) {
			return array.join(", ");
		},
		async agregarProfesional() {
			const addProfesional = httpsCallable(functions, "addProfesional");
			await addProfesional(this.profesional)
				.then((res) => {
					this.router.push({
						path: ROUTES_NAMES.AddProfesionalesConfirmation,
						query: {
							nombre: this.profesional.nombre,
							apellido: this.profesional.apellido,
						},
					});
				})
				.catch((error) => {
					console.error(error);
				});
		},
	},
};
</script>

<style>
.stepperProfesional .p-stepper-nav {
	pointer-events: none;
}

.stepperProfesional .p-stepper-panels,
.stepperProfesional .p-stepper-panels > div {
	height: 92.5%;
}

.stepperProfesional .p-stepper-panels > div {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.stepperProfesional .p-multiselect {
	width: 100%;
	border-radius: 5px;
	background: var(--color-gray);
	border: 1px solid var(--color-blue);
	color: var(--color-black);
	font-size: 0.875rem;
	line-height: 18px;
	padding: 0.5rem 0.875rem;
}

.stepperProfesional .p-multiselect-trigger {
	color: var(--color-blue);
}

.p-multiselect-panel {
	border: 1px solid var(--color-blue);
	border-radius: 5px;
	padding: 0.45rem;
}

.p-multiselect-panel,
.p-multiselect-header {
	background: #b5baca;
}

.p-multiselect-item {
	gap: 0.3rem;
	color: var(--color-blue);
	font-weight: 600;
}

.p-multiselect-panel
	.p-multiselect-items
	.p-multiselect-item:not(.p-highlight):not(.p-disabled).p-focus {
	color: var(--color-blue);
	background: #e3e5ea;
}

.p-checkbox.p-highlight .p-checkbox-box {
	background: var(--color-blue);
	border-color: var(--color-blue);
}

.stepperProfesional .checkboxes label {
	font-weight: 400;
}

.stepperProfesional .p-checkbox .p-checkbox-box {
	width: 1.125rem;
	height: 1.125rem;
	background: var(--color-gray);
	border: 1px solid var(--color-blue);
	border-radius: 5px;
}

.stepperProfesional .p-checkbox.p-highlight .p-checkbox-box {
	background: var(--color-blue);
}
</style>

<style scoped>
.stepContent {
	gap: 1rem;
}

.btnAtras {
	background: none;
	border: none;
	color: var(--color-blue);
}

.datosContainer p {
	font-size: 0.75rem;
	line-height: 15.62px;
}

.datosContainer .datos {
	font-size: 1rem;
	font-weight: 700;
	line-height: 20.83px;
}

.especialidadesContainer {
	border-top: 1px solid var(--color-blue);
	border-bottom: 1px solid var(--color-blue);
}
</style>
