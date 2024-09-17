<template>
  <div
    class="column gap-2"
    v-for="(agendasPorDia, dia) in agendasAgrupadas"
    :key="dia">
    <p class="diaSemana text-blue">{{ diasSemana[dia] }}</p>
    <CardAgendaComponent
      v-for="agenda in agendasPorDia"
      :agenda="agenda"
      :routes="this.routes"
      :key="agenda.horario" />
  </div>
</template>

<script>
  import { diasSemana } from "@/constants/diasSemana.js";
  import CardAgendaComponent from "@/components/profesional/CardAgendaComponent.vue";

  export default {
    props: {
      agendasAgrupadas: {
        type: Object,
        required: true,
      },
      routes: {
        type: Object,
        required: true,
      },
    },
    components: {
      CardAgendaComponent,
    },
    data() {
      return {
        diasSemana: diasSemana,
      };
    },
  };
</script>

<style scoped>
  .diaSemana {
    font-size: 0.875rem;
    font-weight: 800;
    line-height: 18.23px;
  }
</style>
