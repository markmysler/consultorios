<template>
  <main class="w-full">
    <h2>Agenda bloqueada</h2>
    <div class="w-full column gap-3 mt-3">
      <p class="solicitada">
        Se ha confirmado el bloqueo de la agenda del profesional
        <span class="font-bold">Juan Perez.</span>
      </p>
      <div class="rowCenter gap-6">
        <div class="fecha">
          <p>Comienzo</p>
          <p>{{ formatDate(fechaBloqueoAgenda.comienzo) }}</p>
        </div>
        <div class="fecha">
          <p>Fin</p>
          <p>{{ formatDate(fechaBloqueoAgenda.fin) }}</p>
        </div>
      </div>
      <div class="w-full column gap-2 mt-3">
        <router-link class="primaryButtonLink" :to="routes.Search">
          Ir al inicio
        </router-link>
        <router-link class="secondaryButtonLink" :to="routes.BlockAgenda">
          Bloquear otra agenda
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
  import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";

  export default {
    name: "RequestLicenciaConfirmationView",
    data() {
      return {
        routes: ROUTES_NAMES,
        fechaBloqueoAgenda: {
          comienzo: new Date(),
          fin: new Date(),
        },
      };
    },
    methods: {
      formatDate(dateString) {
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        return new Date(dateString).toLocaleDateString("es-ES", options);
      },
    },
  };
</script>

<style scoped>
  .solicitada {
    font-size: 0.875rem;
    line-height: 18.23px;
  }

  .fecha p:first-child {
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 15.62px;
  }

  .fecha p:last-child {
    font-weight: 700;
    color: var(--color-blue);
    line-height: 20.83px;
  }
</style>
