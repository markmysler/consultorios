<template>
  <main class="w-full column">
    <Breadcrumb class="breadcrumb" :model="items" />
    <h2 class="my-3">Sector {{ sectorId }}</h2>
    <div class="w-full column gap-3">
      <div class="calendar column gap-1">
        <label for="date">Seleccione una fecha</label>
        <Calendar
          v-model="date"
          showIcon
          fluid
          iconDisplay="input"
          dateFormat="dd/mm/yy"
          id="date"
        >
        </Calendar>
      </div>
      <div class="time column gap-1">
        <label for="time">Seleccione un horario</label>
        <Calendar id="time" v-model="time" showIcon fluid timeOnly iconDisplay="input">
          <template #inputicon="slotProps">
            <i class="pi pi-clock" @click="slotProps.clickCallback" />
          </template>
        </Calendar>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const sectorId = route.params.sector_id;

const items = ref([
  {
    label: "Sectores",
    command: () => router.push({ path: ROUTES_NAMES.Sectors }),
  },
  {
    label: `Sector ${sectorId}`,
    command: () =>
      router.push({
        path: ROUTES_NAMES.SectorDetails,
        params: { sector_id: sectorId },
      }),
  },
]);

const date = ref();
const time = ref();
</script>

<style>
.calendar .p-inputtext, .time .p-inputtext {
  padding-left: 2.5rem;
}

.p-calendar:not(.p-calendar-disabled).p-focus > .p-inputtext {
  box-shadow: none;
}

.calendar .p-icon,
.time i {
  position: absolute;
  top: 27.5%;
  left: 0.875rem;
  color: var(--color-blue);
}
</style>
