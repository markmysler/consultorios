<template>
  <main class="w-full" v-if="profesional">
    <h2>{{ profesional.nombre }} {{ profesional.apellido }}</h2>
    <div class="especialidades mt-1">
      <div
        class="especialidad border-round-md py-1 px-2"
        v-for="(especialidad, index) in profesional.especialidades"
        :key="index">
        <p class="text-blue">{{ capitalize(especialidad) }}</p>
      </div>
    </div>
    <div class="w-full column gap-3">
      <DiaSemanaComponent
        :routes="routes"
        :agendasAgrupadas="agendasAgrupadas" />
    </div>
  </main>
</template>

<script>
  import { profesionales, agendas } from "@/constants/models.js";
  import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
  import { capitalize } from "vue";
  import { useRoute } from "vue-router";

  import DiaSemanaComponent from "@/components/profesional/DiaSemanaComponent.vue";

  export default {
    name: "ProfesionalDetailsView",
    components: {
      DiaSemanaComponent,
    },
    data() {
      return {
        profesional: null,
        agendasFiltradas: [],
        route: useRoute(),
        routes: ROUTES_NAMES,
      };
    },
    computed: {
      agendasAgrupadas() {
        const agendasPorDia = {};

        this.agendasFiltradas.forEach((agenda) => {
          if (!agendasPorDia[agenda.dia]) {
            agendasPorDia[agenda.dia] = [];
          }
          agendasPorDia[agenda.dia].push(agenda);
        });

        return agendasPorDia;
      },
      profCuil() {
        return this.route.params.profesional_id;
      },
    },
    mounted() {
      this.getProfessional();
      this.filtrarAgendas();
    },
    methods: {
      capitalize,
      filtrarAgendas() {
        this.agendasFiltradas = agendas.filter(
          (agenda) => agenda.cuil === this.profesional.cuil
        );
      },
      getProfessional() {
        this.profesional = profesionales.find(
          (prof) => prof.cuil === Number(this.profCuil)
        );
      },
    },
  };
</script>

<style scoped>
  .especialidad {
    border: 1px solid var(--color-blue);
  }

  .especialidad p {
    font-size: 0.625rem;
    font-weight: 600;
  }
</style>
