<template>
  <div class="inicioFin">
    <div class="bloqueHorario">
      <label for="inicio">Inicio</label>
      <Calendar showIcon fluid timeOnly iconDisplay="input" id="inicio">
        <template #inputicon="slotProps">
          <i class="pi pi-clock" @click="slotProps.clickCallback" />
        </template>
      </Calendar>
    </div>
    <div class="bloqueHorario">
      <label for="fin">Fin</label>
      <Calendar showIcon fluid timeOnly iconDisplay="input" id="fin">
        <template #inputicon="slotProps">
          <i class="pi pi-clock" @click="slotProps.clickCallback" />
        </template>
      </Calendar>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dia: {
      type: Object,
      required: true,
    },
  }
}
</script>

<style>
.inicioFin .p-calendar .p-inputtext {
  color: var(--color-blue);
  padding-left: 2.25rem;
}

.inicioFin .p-calendar .p-datepicker-trigger-icon,
.inicioFin .pi-clock {
  font-size: 1rem;
  position: absolute;
  top: 27.5%;
  left: 0.688rem;
  color: var(--color-blue);
}
</style>

<style scoped>
.inicioFin {
  display: flex;
  gap: 0.5rem;
}

.bloqueHorario {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
</style>