<template>
  <main class="w-full column">
    <Breadcrumb class="breadcrumb" :model="items" />
    <h2 class="my-3">Sector {{ sectorId }}</h2>
    <div class="w-full">
      <div class="column ga-1">
        <label for="fecha">Seleccione una fecha</label>
        <Calendar
          showIcon
          fluid
          iconDisplay="input"
          dateFormat="dd/mm/yyyy"
          id="fecha" />
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

  const iconDisplay = ref();
</script>

<style>
  .p-icon-field > .p-input-icon {
    top: 25%;
		left: 3%;
  }
</style>
