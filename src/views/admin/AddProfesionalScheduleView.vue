<template>
  <main class="w-full">
    <h2>Agregar horarios a <span>J.Perez</span></h2>
    <Stepper class="stepperHorarios w-full h-full bg-gray">
      <StepperPanel class="h-full columnSpaceBetween">
        <template #content="{ nextCallback }">
          <div class="stepContent column">
            <div>
              <label for="especialidad">Especialidad</label>
              <Dropdown class="w-full" id="especialidad" v-model="agenda.especialidad"
                placeholder="Seleccione una especialidad" :options="especialidades" showClear />
              <div class="error mt-1" v-if="validationErrors.especialidad">
                <span class="pi pi-exclamation-circle"></span>
                <p>{{ validationErrors.especialidad }}</p>
              </div>
            </div>
            <div>
              <label for="dias">Seleccione los días de la semana en los que quiere reservar</label>
              <SelectButton v-model="agenda.dias" :options="semana" multiple />
              <div class="error mt-1" v-if="validationErrors.dias">
                <span class="pi pi-exclamation-circle"></span>
                <p>{{ validationErrors.dias }}</p>
              </div>
            </div>
            <div>
              <label for="nombreAgenda">Nombre de la agenda</label>
              <InputText placeholder="Escriba un nombre de agenda" id="nombreAgenda" v-model="agenda.nombreAgenda" />
              <div class="error mt-1" v-if="validationErrors.nombreAgenda">
                <span class="pi pi-exclamation-circle"></span>
                <p>{{ validationErrors.nombreAgenda }}</p>
              </div>
            </div>
          </div>
          <div class="column align-items-end">
            <Button label="Continuar" class="w-7 primaryButton px-3" icon="pi pi-arrow-right" iconPos="right"
              @click="validarPasoUno(nextCallback)" />
          </div>
        </template>
      </StepperPanel>
      <StepperPanel class="h-full columnSpaceBetween">
        <template #content="{ nextCallback, prevCallback }">
          <div class="stepContent column">
            <div>
              <label for="horariosIguales">Seleccione los días de la semana en los que quiere reservar</label>
              <SelectButton class="igualesDiferentes" v-model="agenda.horariosIguales" :options="igualesDiferentes" />
              <div class="error mt-1" v-if="validationErrors.horariosIguales">
                <span class="pi pi-exclamation-circle"></span>
                <p>{{ validationErrors.horariosIguales }}</p>
              </div>
            </div>
            
          </div>
          <div class="rowSpaceBetween">
            <Button aria-label="Atrás" icon="pi pi-arrow-left" class="btnAtras" @click="prevCallback()" />
            <Button label="Continuar" class="w-7 primaryButton px-3" icon="pi pi-arrow-right" iconPos="right"
              @click="validarProfesion(nextCallback)" />
          </div>
        </template>
      </StepperPanel>
    </Stepper>
  </main>
</template>

<script>
import { especialidades } from '@/constants/especialidades';

export default {
  data() {
    return {
      especialidades: especialidades,
      agenda: {
        especialidad: null,
        dias: [],
        nombreAgenda: '',
        horariosIguales: null,
        horarios: [],
      },
      validationErrors: {
        especialidad: false,
        dias: false,
        nombreAgenda: false,
      },
      semana: ["L", "M", "X", "J", "V", "S"],
      igualesDiferentes: ["Iguales", "Diferentes"],
    }
  },
  methods: {
    validarPasoUno(nextCallback) {
      this.validarEspecialidad();
      this.validarDias();
      this.validarNombreAgenda();
      if (
        !this.validationErrors.especialidad &&
        !this.validationErrors.dias &&
        !this.validationErrors.nombreAgenda) {
        nextCallback();
      }
    },
    validarEspecialidad() {
      let especialidad = this.agenda.especialidad;
      if (especialidad === null) {
        this.validationErrors.especialidad =
          "Debes seleccionar al menos una especialidad";
      } else {
        this.validationErrors.especialidad = null;
      }
    },
    validarDias() {
      let dias = this.agenda.dias;
      if (dias.length === 0) {
        this.validationErrors.dias = "Debes seleccionar al menos un día";
      } else {
        this.validationErrors.dias = null;
      }
    },
    validarNombreAgenda() {
      let nombreAgenda = this.agenda.nombreAgenda;
      if (nombreAgenda === '') {
        this.validationErrors.nombreAgenda = "Debes escribir un nombre para la agenda";
      } else {
        this.validationErrors.nombreAgenda = null;
      }
    },
  }
}
</script>

<style>
/* .stepperHorarios .p-stepper-nav {
  pointer-events: none;
} */

.stepperHorarios .p-stepper-panels,
.stepperHorarios .p-stepper-panels>div {
  height: 92.5%;
}

.stepperHorarios .p-stepper-panels>div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.stepperHorarios .p-selectbutton {
  display: flex;
  justify-content: space-between;
  background-color: var(--color-dark-gray);
  border-radius: 8px;
  padding: 5px;
}

.stepperHorarios .igualesDiferentes {
  width: max-content;
  margin: 0 auto;
}

.stepperHorarios .p-selectbutton .p-button {
  background: none;
  color: var(--color-blue);
  border-radius: 6px;
  border: none;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.5rem 0.875rem;
}

.stepperHorarios .p-selectbutton .p-button.p-highlight {
  background: var(--color-light-blue);
}
</style>

<style scoped>
.stepContent {
  gap: 1rem;
}

.stepContent > div {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.btnAtras {
  background: none;
  border: none;
  color: var(--color-blue);
}

</style>
