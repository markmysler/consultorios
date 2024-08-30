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
              />
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
              />
            </div>
          </div>
          <div class="column align-items-end">
            <Button
              label="Continuar"
              class="w-6 primaryButton"
              @click="nextCallback"
            />
          </div>
        </template>
      </StepperPanel>
      <StepperPanel>
        <template #content="{ prevCallback }">
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
          <div class="w-full rowCenter justify-content-between">
            <Button
              class="w-3 primaryButton"
              label="Atrás"
              @click="prevCallback"
            />
            <Button
              class="w-7 primaryButton"
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
        fechaInicio: new Date(),
        fechaFin: new Date(),
      },
    };
  },
  methods: {
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
