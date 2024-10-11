<template>
	<main class="w-full">
		<h2>Solicitar Licencia</h2>
		<Stepper class="w-full h-full requestLicencia bg-gray">
			<StepperPanel>
				<template #content="{ nextCallback }">
					<div class="column gap-3">
						<div class="w-full inputCalendar column gap-1">
							<label for="fechaInicio"
								>Seleccione una fecha de inicio</label
							>
							<Calendar
								v-model="licenciaSolicitada.fechaInicio"
								class="w-full"
								placeholder="Fecha de inicio"
								showIcon
								fluid
								iconDisplay="input"
								dateFormat="dd/mm/yy"
								id="fechaInicio"
								:disabled="!store.userData"
								:minDate="min_date_start"
								@change="validateFechaInicio"
							/>
							<div
								class="error mt-1"
								v-if="validationErrors.fechaInicio"
							>
								<span class="pi pi-exclamation-circle"></span>
								<p>{{ validationErrors.fechaInicio }}</p>
							</div>
						</div>
						<div class="w-full inputCalendar column gap-1">
							<label for="fechaFin"
								>Seleccione una fecha de fin</label
							>
							<Calendar
								v-model="licenciaSolicitada.fechaFin"
								class="w-full"
								placeholder="Fecha de fin"
								showIcon
								fluid
								iconDisplay="input"
								dateFormat="dd/mm/yy"
								id="fechaFin"
								:minDate="min_date_end"
								@change="validateFechaFin"
							/>
							<div
								class="error mt-1"
								v-if="validationErrors.fechaFin"
							>
								<span class="pi pi-exclamation-circle"></span>
								<p>{{ validationErrors.fechaFin }}</p>
							</div>
						</div>
					</div>
					<div class="column align-items-end">
						<Button
							label="Continuar"
							class="w-7 primaryButton px-3"
							icon="pi pi-arrow-right"
							iconPos="right"
							@click="validarFechas(nextCallback)"
						/>
					</div>
				</template>
			</StepperPanel>
			<StepperPanel>
				<template #content="{ nextCallback }">
					<div class="column gap-3">
						<div class="w-full column gap-1">
							<label for="tipoLicencia"
								>Seleccione un tipo de licencia</label
							>
							<Dropdown
								id="tipoLicencia"
								class="w-full dropDownNumero"
								v-model="licenciaSolicitada.tipoLicencia"
								placeholder="Tipo de licencia"
								:options="tiposLicencia"
								showClear
							/>
							<div
								class="error mt-1"
								v-if="validationErrors.tipoLicencia"
							>
								<span class="pi pi-exclamation-circle"></span>
								<p>{{ validationErrors.tipoLicencia }}</p>
							</div>
						</div>
						<div
							v-if="
								licenciaSolicitada.tipoLicencia === 'Ordinaria'
							"
							class="w-full column gap-1"
						>
							<label for="anio"
								>Ingrese el año de la licencia</label
							>
							<InputNumber
								id="anio"
								class="w-full"
								v-model="licenciaSolicitada.anio"
								:useGrouping="false"
								placeholder="Año de la licencia"
							/>
							<div
								class="error mt-1"
								v-if="validationErrors.anio"
							>
								<span class="pi pi-exclamation-circle"></span>
								<p>{{ validationErrors.anio }}</p>
							</div>
						</div>
					</div>
					<div class="column align-items-end">
						<Button
							label="Continuar"
							class="w-7 primaryButton px-3"
							icon="pi pi-arrow-right"
							iconPos="right"
							@click="validarTipoLicencia(nextCallback)"
						/>
					</div>
				</template>
			</StepperPanel>
			<StepperPanel>
				<template #content="{ nextCallback }">
					<div class="column gap-3">
						<div class="w-full uploadImagen column gap-1">
							<label for="imagen"
								>Cargue la imágen de su certificado de
								licencia</label
							>
							<FileUpload
								mode="basic"
								accept="image/*"
								:maxFileSize="1000000"
								chooseLabel="Seleccione un archivo"
								@select="onFileSelect"
							/>
							<div v-if="progress > 0">
								Upload Progress: {{ progress }}%
							</div>

							<div
								class="error mt-1"
								v-if="validationErrors.imagen"
							>
								<span class="pi pi-exclamation-circle"></span>
								<p>{{ validationErrors.imagen }}</p>
							</div>
						</div>
					</div>
					<div class="column align-items-end">
						<Button
							label="Continuar"
							class="w-7 primaryButton px-3"
							icon="pi pi-arrow-right"
							iconPos="right"
							@click="validarImagen(nextCallback)"
						/>
					</div>
				</template>
			</StepperPanel>
			<StepperPanel>
				<template #content>
					<div>
						<div class="rowSpaceBetween py-2">
							<div class="column gap-3">
								<div class="datoLicencia column gap-1">
									<p>Comienzo de licencia</p>
									<p>
										{{
											formatDate(
												licenciaSolicitada.fechaInicio
											)
										}}
									</p>
								</div>
								<div class="datoLicencia column gap-1">
									<p>Fin de licencia</p>
									<p>
										{{
											formatDate(
												licenciaSolicitada.fechaFin
											)
										}}
									</p>
								</div>
							</div>
						</div>
						<div class="tipoContainer rowSpaceBetween py-2">
							<div class="column gap-3">
								<div class="datoLicencia column gap-1">
									<p>Tipo de licencia</p>
									<p>{{ licenciaSolicitada.tipoLicencia }}</p>
								</div>
								<div
									v-if="licenciaSolicitada.anio"
									class="datoLicencia column gap-1"
								>
									<p>Año de la licencia</p>
									<p>
										{{
											formatDate(licenciaSolicitada.anio)
										}}
									</p>
								</div>
							</div>
						</div>
						<div class="rowSpaceBetween py-2">
							<div class="datoLicencia column gap-1">
								<p>Certificado de licencia</p>
								<p>{{ licenciaSolicitada.imagen }}</p>
							</div>
						</div>
					</div>

					<div class="w-full rowCenter justify-content-between">
						<Button
							class="primaryButton"
							label="Confirmar datos"
							@click="solicitarLicencia"
						/>
					</div>
				</template>
			</StepperPanel>
		</Stepper>
	</main>
</template>

<script>
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
import { db, storage } from "@/firebase/init";
import { useUserStore } from "@/stores/user";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from "vue-router";

export default {
	name: "RequestLicenciaView",
	data() {
		return {
			router: useRouter(),
			progress: 0,
			store: useUserStore(),
			min_date_start: null,
			min_date_end: null,
			licenciaSolicitada: {
				fechaInicio: null,
				fechaFin: null,
				tipoLicencia: null,
				anio: null,
				imagen: null,
			},
			validationErrors: {
				fechaInicio: null,
				fechaFin: null,
				tipoLicencia: null,
				anio: null,
				imagen: null,
			},
			tiposLicencia: ["Estrés", "Ordinaria", "Salubridad"],
		};
	},
	methods: {
		onFileSelect(event) {
			const file = event.files[0]; // Get the selected file from the event
			this.uploadFile(file);
		},
		uploadFile(file) {
			// Create metadata for the file
			const metadata = {
				contentType: file.type,
			};

			// Create a storage reference using the file's name
			const storageRef = ref(
				storage,
				"licencias/" +
					this.store.userData.nombre +
					"_" +
					this.store.userData.apellido +
					"/" +
					file.name
			);

			// Upload the file with its metadata
			const uploadTask = uploadBytesResumable(storageRef, file, metadata);

			// Monitor upload progress and handle completion or errors
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					// Calculate and update the upload progress
					this.progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log("Upload is " + this.progress + "% done");
				},
				(error) => {
					// Handle errors during the upload process
					switch (error.code) {
						case "storage/unauthorized":
							console.error(
								"User doesn't have permission to upload the file"
							);
							break;
						case "storage/canceled":
							console.error("User canceled the upload");
							break;
						case "storage/unknown":
							console.error(
								"Unknown error occurred",
								error.serverResponse
							);
							break;
					}
				},
				() => {
					// When upload is complete, get the file's download URL
					getDownloadURL(uploadTask.snapshot.ref).then(
						(downloadURL) => {
							this.licenciaSolicitada.imagen = downloadURL;
							console.log("File available at", downloadURL);
							// You can now use the download URL (e.g., store it in your database)
						}
					);
				}
			);
		},
		validarImagen(nextCallback) {
			if (!this.licenciaSolicitada.imagen) {
				this.validationErrors.imagen =
					"Debe subir una imagen de su licencia.";
			} else {
				this.validationErrors.imagen = null;
				nextCallback();
			}
		},
		validateFechaInicio() {
			if (!this.licenciaSolicitada.fechaInicio) {
				this.validationErrors.fechaInicio =
					"Debe seleccionar una fecha de inicio.";
			} else {
				this.validationErrors.fechaInicio = null;
			}
		},
		validateFechaFin() {
			if (!this.licenciaSolicitada.fechaFin) {
				this.validationErrors.fechaFin =
					"Debe seleccionar una fecha de fin.";
			} else if (
				new Date(this.licenciaSolicitada.fechaFin) <=
				new Date(this.licenciaSolicitada.fechaInicio)
			) {
				this.validationErrors.fechaFin =
					"La fecha de fin debe ser posterior a la fecha de inicio.";
			} else {
				this.validationErrors.fechaFin = null;
			}
		},
		validarFechas(nextCallback) {
			this.validateFechaInicio();
			this.validateFechaFin();
			if (
				!this.validationErrors.fechaInicio &&
				!this.validationErrors.fechaFin
			) {
				nextCallback();
			}
		},
		validarTipoLicencia(nextCallback) {
			if (!this.licenciaSolicitada.tipoLicencia) {
				this.validationErrors.tipoLicencia =
					"Debes elegir un tipo de licencia";
			} else if (this.licenciaSolicitada.tipoLicencia === "Ordinaria") {
				if (!this.licenciaSolicitada.anio) {
					this.validationErrors.anio =
						"Debes escribir un año de la licencia";
				} else if (
					this.licenciaSolicitada.anio <= 1900 ||
					this.licenciaSolicitada.anio > new Date().getFullYear()
				) {
					this.validationErrors.anio = "Ingrese un año válido";
				} else {
					nextCallback();
				}
			} else {
				nextCallback();
			}
		},
		async solicitarLicencia() {
			console.log(this.licenciaSolicitada);

			const ref = collection(db, "licencias");
			const licencia = {};
			licencia["cuil"] = this.store.userData.cuil;
			licencia["estado"] = "pendiente";
			licencia["inicio"] = this.licenciaSolicitada.fechaInicio.toJSON();
			licencia["fin"] = this.licenciaSolicitada.fechaFin.toJSON();
			licencia["imagen"] = this.licenciaSolicitada.imagen;
			licencia["tipo"] = this.licenciaSolicitada.tipoLicencia;

			if (licencia["tipo"] === "ordinaria") {
				licencia["anio"] = this.licenciaSolicitada.anio;
			}

			await addDoc(ref, licencia)
				.then(() => {
					this.router.push({
						path: ROUTES_NAMES.RequestLicenciaConfirmation,
						query: {
							state: JSON.stringify(licencia),
						},
					});
				})
				.catch((err) => {
					console.log(err);
				});
		},
		formatDate(dateString) {
			const options = {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			};
			return new Date(dateString).toLocaleDateString("es-ES", options);
		},
	},
	mounted() {
		this.min_date_start = new Date();
		this.min_date_start.setDate(
			this.min_date_start.getDate() +
				this.store.userData.anticipacion_licencia
		);
		this.min_date_end = new Date();
		this.min_date_end.setDate(
			this.min_date_end.getDate() +
				this.store.userData.anticipacion_licencia +
				1
		);
	},
};
</script>

<style>
.requestLicencia .p-stepper-nav {
	pointer-events: none;
	margin: 1rem 0;
}

.requestLicencia .p-stepper-panels {
	height: 90%;
}

.requestLicencia .p-stepper-content {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.inputCalendar .p-input-icon {
	top: 27.5%;
	left: 0.625rem;
	right: auto;
}

.inputCalendar .p-calendar .p-datepicker-trigger-icon {
	font-size: 1rem;
	position: absolute;
	top: 27.5%;
	left: 0.688rem;
	color: var(--color-blue);
}

.inputCalendar .p-inputtext {
	padding-left: 2.188rem;
}

.uploadImagen .p-fileupload .p-button {
	gap: 0.75rem;
	background: transparent;
	border-radius: 5px;
	border: 1px solid var(--color-blue);
	color: var(--color-blue);
	padding: 0.625rem;
}
</style>

<style scoped>
label {
	font-weight: 600;
}

.editar {
	font-size: 0.875rem;
}

.datoLicencia p:first-child {
	font-size: 0.75rem;
	font-weight: 500;
	line-height: 15.62px;
}

.datoLicencia p:last-child {
	font-weight: 700;
	color: var(--color-blue);
	line-height: 20.83px;
}

.tipoContainer {
	border-top: 1px solid var(--color-blue);
	border-bottom: 1px solid var(--color-blue);
}
</style>
