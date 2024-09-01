<template>
  <main class="w-full">
    <h2>Bloquear Agenda Profesional</h2>
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
                v-model="agendaBloqueada.input" />
            </IconField>
          </div>
          <div class="column align-items-end">
            <Button
              label="Continuar"
              class="w-7 primaryButton px-3"
              icon="pi pi-arrow-right"
              iconPos="right"
              @click="nextCallback" />
          </div>
        </template>
      </StepperPanel>

      <!-- Paso 2: Selección de Fechas -->
      <StepperPanel>
        <template #content="{ nextCallback }">
          <div class="column gap-3">
            <div class="w-full inputCalendar column gap-1">
              <label for="fechaInicio">Seleccione una fecha de inicio</label>
              <Calendar
                v-model="agendaBloqueada.fechaInicio"
                class="w-full"
                placeholder="Fecha de inicio"
                showIcon
                fluid
                iconDisplay="input"
                dateFormat="dd/mm/yy"
                id="fechaInicio"
                @change="validateFechaInicio" />
              <div class="error mt-1" v-if="validationErrors.fechaInicio">
                <span class="pi pi-exclamation-circle"></span>
                <p>{{ validationErrors.fechaInicio }}</p>
              </div>
            </div>
            <div class="w-full inputCalendar column gap-1">
              <label for="fechaFin">Seleccione una fecha de fin</label>
              <Calendar
                v-model="agendaBloqueada.fechaFin"
                class="w-full"
                placeholder="Fecha de fin"
                showIcon
                fluid
                iconDisplay="input"
                dateFormat="dd/mm/yy"
                id="fechaFin"
                @change="validateFechaFin" />
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
              @click="validarFechas(nextCallback)" />
          </div>
        </template>
      </StepperPanel>

      <!-- Paso 3: Confirmación -->
      <StepperPanel>
        <template #content="{ prevCallback }">
          <div class="rowSpaceBetween">
            <div class="datosContainer column gap-3">
              <div class="datoLicencia column gap-1">
                <p>Profesional</p>
                <p class="datos text-blue">{{ agendaBloqueada.input }}</p>
              </div>
              <div class="datoLicencia column gap-1">
                <p>Comienzo de licencia</p>
                <p class="datos text-blue">{{ formatDate(agendaBloqueada.fechaInicio) }}</p>
              </div>
              <div class="datoLicencia column gap-1">
                <p>Fin de licencia</p>
                <p class="datos text-blue">{{ formatDate(agendaBloqueada.fechaFin) }}</p>
              </div>
            </div>
            <div>
              <Button
                class="editar flex gap-2 bg-dark-gray border-none border-round-3xl text-blue py-1 px-3"
                label="Editar"
                icon="pi pi-pen-to-square"
                iconPos="right"
                @click="prevCallback" />
            </div>
          </div>
          <div class="w-full rowCenter justify-content-between">
            <Button
              class="primaryButton"
              label="Confirmar Bloqueo"
              @click="confirmarBloqueo" />
          </div>
        </template>
      </StepperPanel>
    </Stepper>
  </main>
</template>

<script>
  export default {
    name: "BlockAgendaView",
    data() {
      return {
        agendaBloqueada: {
          input: "",
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
        if (!this.agendaBloqueada.fechaInicio) {
          this.validationErrors.fechaInicio =
            "Debe seleccionar una fecha de inicio.";
        } else {
          this.validationErrors.fechaInicio = null;
        }
      },
      validateFechaFin() {
        if (!this.agendaBloqueada.fechaFin) {
          this.validationErrors.fechaFin = "Debe seleccionar una fecha de fin.";
        } else if (
          new Date(this.agendaBloqueada.fechaFin) <=
          new Date(this.agendaBloqueada.fechaInicio)
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
      confirmarBloqueo() {
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
</style>
