<template>
  <main class="w-full column">
    <Breadcrumb class="breadcrumb" :model="items" />
    <h2 class="my-3">Sector {{ sectorId }}</h2>
    <div class="w-full sectorDetails column gap-3">
      <div class="calendar column gap-1">
        <label for="date">Seleccione una fecha</label>
        <Calendar
          v-model="date"
          showIcon
          fluid
          iconDisplay="input"
          dateFormat="dd/mm/yy"
          id="date" />
      </div>
      <div class="time column gap-1">
        <label for="time">Seleccione un horario</label>
        <Calendar
          id="time"
          v-model="time"
          showIcon
          fluid
          timeOnly
          iconDisplay="input">
          <template #inputicon="slotProps">
            <i class="pi pi-clock" @click="slotProps.clickCallback" />
          </template>
        </Calendar>
      </div>
      <div class="consultoriosLayout">
        <div
          v-for="consultorio in filteredConsultorios"
          :key="consultorio"
          :class="getConsultorioClass(consultorio)"
          @click="selectConsultorio(consultorio)">
          {{ consultorio }}
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
  import { consultorios } from "@/constants/models.js";
  import { useRouter, useRoute } from "vue-router";

  export default {
    data() {
      return {
        date: new Date(),
        time: new Date(),
        selectedConsultorio: null,
        router: useRouter(),
        route: useRoute(),
      };
    },
    computed: {
      sectorId() {
        return this.route.params.sector_id;
      },
      items() {
        return [
          {
            label: "Sectores",
            command: () => this.router.push({ path: ROUTES_NAMES.Sectors }),
          },
          {
            label: `Sector ${this.sectorId}`,
          },
        ];
      },
      filteredConsultorios() {
        return consultorios[this.sectorId] || [];
      },
    },
    methods: {
      goTo(consultorio) {
        return `${ROUTES_NAMES.ConsultorioDetails}/${this.sectorId}/${consultorio}`;
      },
      getConsultorioClass(consultorio) {
        // Simulacion Disponibilidad
        const isAvailable = Math.random() > 0.5; // Simulación de disponibilidad
        return {
          available: isAvailable,
          unavailable: !isAvailable,
          selected: this.selectedConsultorio === consultorio,
        };
      },
      selectConsultorio(consultorio) {
        this.selectedConsultorio = consultorio;
        this.$router.push(this.goTo(consultorio))
      },
    },
  };
</script>

<style>
  .sectorDetails .calendar .p-inputtext,
  .time .p-inputtext {
    font-weight: 500;
    padding-left: 2.5rem;
  }

  .sectorDetails .p-calendar:not(.p-calendar-disabled).p-focus > .p-inputtext {
    box-shadow: none;
  }

  .sectorDetails .calendar .p-icon,
  .sectorDetails .time i {
    position: absolute;
    top: 27.5%;
    left: 0.875rem;
    color: var(--color-blue);
  }
</style>

<style scoped>
  label {
    font-weight: 500;
  }

  .consultoriosLayout {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.5rem;
  }

  .consultoriosLayout div {
    padding: 0.375rem 0.625rem;
    text-align: center;
    border: 1px solid black;
    border-radius: 0.25rem;
    color: black;
    cursor: pointer;
  }

  .available {
    background-color: rgba(141, 222, 94, 1);
  }

  .unavailable {
    background-color: rgba(222, 94, 94, 1);
  }

  .selected {
    border: 1px solid #2196f3;
  }
</style>
