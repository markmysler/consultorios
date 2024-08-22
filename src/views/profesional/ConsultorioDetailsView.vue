<template>
  <main class="w-full">
    <Breadcrumb class="breadcrumb" :model="items" />
    <h2 class="mt-3">Consultorio {{ consultorioId }}</h2>
    <p>Sector {{ sectorId }}</p>
  </main>
  <div>
    <p v-if="agendasConsultorio">{{ agendasConsultorio[0] }}</p>
  </div>
</template>

<script>
import { agendas } from "@/constants/models.js";
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "ConsultorioDetailsView",
  data() {
    return {
      route: useRoute(),
      router: useRouter(),
      agendasConsultorio: null,
    };
  },
  methods: {
    getAgendasFiltradas() {
      console.log(this.sectorId);
      console.log(this.consultorioId);
      return agendas.filter(
        (agenda) =>
          agenda.consultorio.sector === this.sectorId &&
          agenda.consultorio.nombre === this.consultorioId
      );
    },
  },
  onMounted() {
    this.agendasConsultorio = this.getAgendasFiltradas();
  },
  computed: {
    sectorId() {
      return this.route.params.sector_id;
    },
    consultorioId() {
      return this.route.params.consultorio_id;
    },
    items() {
      return [
        {
          label: "Sectores",
          command: () => this.router.push({ path: ROUTES_NAMES.Sectors }),
        },
        {
          label: `Sector ${this.sectorId}`,
          command: () => this.router.push({ path: `${ROUTES_NAMES.SectorDetails}/${this.sectorId}` })
        },
        {
          label: `Consultorio ${this.consultorioId}`,
        },
      ];
    },
  },
};
</script>
