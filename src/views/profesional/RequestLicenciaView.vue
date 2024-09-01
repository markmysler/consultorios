<template>
  <main class="w-full">
    <h2>Solicitar Licencia</h2>
    <Stepper class="w-full h-full requestLicencia bg-gray mt-3">
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
        <template #content="{ prevCallback }">
          <div class="rowSpaceBetween">
            <div class="column gap-3">
              <div class="datoLicencia column gap-1">
                <p>Profesional</p>
                <p>{{ licenciaSolicitada.profesional }}</p>
              </div>
              <div class="datoLicencia column gap-1">
                <p>Comienzo de licencia</p>
                <p>{{ formatDate(licenciaSolicitada.fechaInicio) }}</p>
              </div>
              <div class="datoLicencia column gap-1">
                <p>Fin de licencia</p>
                <p>{{ formatDate(licenciaSolicitada.fechaFin) }}</p>
              </div>
            </div>
            <div>
              <Button
                class="editar flex gap-2 bg-dark-gray border-none border-round-3xl text-blue py-1 px-3"
                label="Editar"
                icon="pi pi-pen-to-square"
                iconPos="right"
                @click="prevCallback"
              />
            </div>
          </div>
          <div class="w-full rowCenter justify-content-between">
            <Button
              class="primaryButton"
              label="Solicitar Licencia"
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
      },
      validationErrors: {
        fechaInicio: null,
        fechaFin: null,
      },
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
  display: none;
}

.requestLicencia .p-stepper-panels {
  height: 100%;
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
</style>
