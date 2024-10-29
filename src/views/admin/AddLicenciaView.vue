<template>
  <main class="w-full">
    <h2>Agregar una licencia</h2>
    <Stepper class="stepperAgenda w-full h-full bg-gray">
      <!-- Paso 1 -->
      <StepperPanel class="h-full columnSpaceBetween">
        <template #content="{ nextCallback }">
          <div>
            <label for="">Busque un profesional por nombre o CUIL</label>
            <IconField class="searchInput inputAgenda mb-2">
              <InputIcon class="text-blue pi pi-search" />
              <InputText
                placeholder="Nombre de Agenda"
                class="i"
                v-model="licenciaAgregada.input"
              />
            </IconField>
          </div>
          <div class="column align-items-end">
            <Button
              label="Continuar"
              class="w-7 primaryButton px-3"
              icon="pi pi-arrow-right"
              iconPos="right"
              @click="nextCallback"
            />
          </div>
        </template>
      </StepperPanel>

      <!-- Paso 2: Selección de Fechas -->
      <StepperPanel>
        <template #content="{ nextCallback, prevCallback }">
          <div class="column gap-3">
            <div class="w-full inputCalendar column gap-1">
              <label for="fechaInicio">Seleccione una fecha de inicio</label>
              <Calendar
                v-model="licenciaAgregada.fechaInicio"
                class="w-full"
                placeholder="Fecha de inicio"
                showIcon
                fluid
                iconDisplay="input"
                dateFormat="dd/mm/yy"
                id="fechaInicio"
                :minDate="min_date_start"
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
                v-model="licenciaAgregada.fechaFin"
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
              <div class="error mt-1" v-if="validationErrors.fechaFin">
                <span class="pi pi-exclamation-circle"></span>
                <p>{{ validationErrors.fechaFin }}</p>
              </div>
            </div>
          </div>
          <div class="rowSpaceBetween">
            <Button
              aria-label="Atrás"
              icon="pi pi-arrow-left"
              class="btnAtras"
              @click="prevCallback"
            />
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

      <!-- Paso 3: Tipo de Licencia -->
      <StepperPanel>
        <template #content="{ nextCallback, prevCallback }">
          <div class="column gap-3">
            <div class="w-full column gap-1">
              <label for="tipoLicencia">Seleccione un tipo de licencia</label>
              <Dropdown
                id="tipoLicencia"
                class="w-full dropDownNumero"
                v-model="licenciaAgregada.tipoLicencia"
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
              v-if="licenciaAgregada.tipoLicencia === 'Ordinaria'"
              class="w-full column gap-1"
            >
              <label for="anio">Ingrese el año de la licencia</label>
              <InputNumber
                id="anio"
                class="w-full"
                v-model="licenciaAgregada.anio"
                placeholder="Año de la licencia"
                :useGrouping="false"
              />
              <div class="error mt-1" v-if="validationErrors.anio">
                <span class="pi pi-exclamation-circle"></span>
                <p>{{ validationErrors.anio }}</p>
              </div>
            </div>
          </div>
          <div class="rowSpaceBetween">
            <Button
              aria-label="Atrás"
              icon="pi pi-arrow-left"
              class="btnAtras"
              @click="prevCallback"
            />
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

      <!-- Paso 4: Confirmación -->
      <StepperPanel>
        <template #content="{ prevCallback }">
          <div>
            <div class="rowSpaceBetween datosContainer py-2">
              <div class="datoLicencia column gap-1">
                <p>Profesional</p>
                <p class="datos text-blue">{{ licenciaAgregada.input }}</p>
              </div>
            </div>
            <div class="fechasContainer rowSpaceBetween py-2">
              <div class="datosContainer column gap-3">
                <div class="datoLicencia column gap-1">
                  <p>Comienzo de licencia</p>
                  <p class="datos text-blue">
                    {{ formatDate(licenciaAgregada.fechaInicio) }}
                  </p>
                </div>
                <div class="datoLicencia column gap-1">
                  <p>Fin de licencia</p>
                  <p class="datos text-blue">
                    {{ formatDate(licenciaAgregada.fechaFin) }}
                  </p>
                </div>
              </div>
            </div>
            <div class="rowSpaceBetween py-2">
              <div class="datosContainer column gap-3">
                <div class="datoLicencia column gap-1">
                  <p>Tipo de licencia</p>
                  <p class="datos text-blue">
                    {{ licenciaAgregada.tipoLicencia }}
                  </p>
                </div>
                <div
                  v-if="licenciaAgregada.anio"
                  class="datoLicencia column gap-1"
                >
                  <p>Año de la licencia</p>
                  <p class="datos text-blue">
                    {{ licenciaAgregada.anio }}
                  </p>
                </div>
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
              @click="agregarLicencia"
            />
          </div>
        </template>
      </StepperPanel>
    </Stepper>
  </main>
</template>

<script>
export default {
  name: "AddLicenciaView",
  data() {
    return {
      min_date_start: new Date(),
      min_date_end: new Date(),
      licenciaAgregada: {
        input: "",
        fechaInicio: null,
        fechaFin: null,
        tipoLicencia: null,
        anio: null,
      },
      validationErrors: {
        fechaInicio: null,
        fechaFin: null,
        tipoLicencia: null,
        anio: null,
      },
      tiposLicencia: ["Estrés", "Ordinaria", "Salubridad"],
    };
  },
  methods: {
    validateFechaInicio() {
      if (!this.licenciaAgregada.fechaInicio) {
        this.validationErrors.fechaInicio =
          "Debe seleccionar una fecha de inicio.";
      } else {
        this.validationErrors.fechaInicio = null;
      }
    },
    validateFechaFin() {
      if (!this.licenciaAgregada.fechaFin) {
        this.validationErrors.fechaFin = "Debe seleccionar una fecha de fin.";
      } else if (
        new Date(this.licenciaAgregada.fechaFin) <=
        new Date(this.licenciaAgregada.fechaInicio)
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
      if (!this.licenciaAgregada.tipoLicencia) {
        this.validationErrors.tipoLicencia = "Debes elegir un tipo de licencia";
      } else if (this.licenciaAgregada.tipoLicencia === "Ordinaria") {
        if (!this.licenciaAgregada.anio) {
          this.validationErrors.anio = "Debes escribir un año de la licencia";
        } else if (
          this.licenciaAgregada.anio <= 1900 ||
          this.licenciaAgregada.anio > new Date().getFullYear()
        ) {
          this.validationErrors.anio = "Ingrese un año válido";
        } else {
          nextCallback();
        }
      } else {
        nextCallback();
      }
    },
    agregarLicencia() {
      // Router push AddLicenciaConfirmation
      console.log("Bloqueo Confirmado");
    },
    formatDate(dateString) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return new Date(dateString).toLocaleDateString("es-ES", options);
    },
  },
};
</script>

<style>
.stepperAgenda .p-stepper-nav {
  pointer-events: none;
}

.stepperAgenda .p-stepper-panels {
  height: 100%;
}

.stepperAgenda .p-stepper-content {
  height: 87.5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.inputAgenda .p-inputtext {
  font-weight: 500 !important;
}
</style>

<style scoped>
.btnAtras {
  background: none;
  border: none;
  color: var(--color-blue);
}

label {
  font-weight: 500;
  font-size: 0.875rem;
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

.fechasContainer {
  border-top: 1px solid var(--color-blue);
  border-bottom: 1px solid var(--color-blue);
}
</style>
