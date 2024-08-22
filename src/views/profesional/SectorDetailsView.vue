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
          id="date"
        />
      </div>
      <div class="time column gap-1">
        <label for="time">Seleccione un horario</label>
        <Calendar
          id="time"
          v-model="time"
          showIcon
          fluid
          timeOnly
          iconDisplay="input"
        >
          <template #inputicon="slotProps">
            <i class="pi pi-clock" @click="slotProps.clickCallback" />
          </template>
        </Calendar>
      </div>
      <router-link :to="goTo(1)">Consultorio Ejemplo</router-link>
    </div>
  </main>
</template>

<script>
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
import { useRouter, useRoute } from "vue-router";

export default {
  data() {
    return {
      date: new Date(),
      time: new Date(),
      router: useRouter(),
      route: useRoute(),
    };
  },
  methods: {
    goTo(consultorio) {
      return `${ROUTES_NAMES.ConsultorioDetails}/${this.sectorId}/${consultorio}`;
    }
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
</style>
