<template>
  <main class="w-full">
    <h2>Solicitar Licencia</h2>
    <Stepper class="w-full h-full requestLicencia bg-gray">
      <StepperPanel>
        <template #content="{ nextCallback }">
          <div class="column gap-3">
            <div class="w-full inputCalendar column gap-1">
              <label for="fechaInicio">Seleccione una fecha de inicio</label>
              <Calendar
                v-model="licenciaSolicitada.fechaInicio"
                class="w-full"
                placeholder="Fecha de inicio"
                showIcon
                fluid
                iconDisplay="input"
                dateFormat="dd/mm/yy"
                id="fechaInicio"
                @change="validateFechaInicio"
              />
              <div class="error mt-1" v-if="validationErrors.fechaInicio">
                <span class="pi pi-exclamation-circle"></span>
                <p>{{ validationErrors.fechaInicio }}</p>
              </div>
            </div>
            <div class="w-full inputCalendar column gap-1">
              <label for="fechaFin">Seleccione una fecha de fin</label>
              <Calendar
                v-model="licenciaSolicitada.fechaFin"
                class="w-full"
                placeholder="Fecha de fin"
                showIcon
                fluid
                iconDisplay="input"
                dateFormat="dd/mm/yy"
                id="fechaFin"
                @change="validateFechaFin"
              />
              <div class="error mt-1" v-if="validationErrors.fechaFin">
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
              <label for="tipoLicencia">Seleccione un tipo de licencia</label>
              <Dropdown
                id="tipoLicencia"
                class="w-full dropDownNumero"
                v-model="licenciaSolicitada.tipoLicencia"
                placeholder="Tipo de licencia"
                :options="tiposLicencia"
                showClear
              />
              <div class="error mt-1" v-if="validationErrors.tipoLicencia">
                <span class="pi pi-exclamation-circle"></span>
                <p>{{ validationErrors.tipoLicencia }}</p>
              </div>
            </div>
            <div
              v-if="licenciaSolicitada.tipoLicencia === 'Ordinaria'"
              class="w-full column gap-1"
            >
              <label for="anio">Ingrese el año de la licencia</label>
              <InputNumber
                id="anio"
                class="w-full"
                v-model="licenciaSolicitada.anio"
                placeholder="Año de la licencia"
              />
              <div class="error mt-1" v-if="validationErrors.anio">
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
                >Cargue la imágen de su certificado de licencia</label
              >
              <FileUpload
                mode="basic"
                name="demo[]"
                accept="image/*"
                :maxFileSize="1000000"
                v-model="licenciaSolicitada.imagen"
                :auto="true"
                chooseLabel="Seleccione un archivo"
              />
              <div class="error mt-1" v-if="validationErrors.imagen">
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
                  <p>{{ formatDate(licenciaSolicitada.fechaInicio) }}</p>
                </div>
                <div class="datoLicencia column gap-1">
                  <p>Fin de licencia</p>
                  <p>{{ formatDate(licenciaSolicitada.fechaFin) }}</p>
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
                  <p>{{ formatDate(licenciaSolicitada.anio) }}</p>
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
export default {
  name: "RequestLicenciaView",
  data() {
    return {
      licenciaSolicitada: {
        profesional: "Juan Perez",
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
        this.validationErrors.fechaFin = "Debe seleccionar una fecha de fin.";
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
        this.validationErrors.tipoLicencia = "Debes elegir un tipo de licencia";
      } else if (this.licenciaSolicitada.tipoLicencia === "Ordinaria") {
        if (!this.licenciaSolicitada.anio) {
          this.validationErrors.anio = "Debes escribir un año de la licencia";
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
    solicitarLicencia() {
      console.log("Licencia Solicitada");
    },
    formatDate(dateString) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return new Date(dateString).toLocaleDateString("es-ES", options);
    },
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
