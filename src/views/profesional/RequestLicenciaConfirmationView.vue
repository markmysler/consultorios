<template>
  <main class="w-full">
    <h2>Licencia solicitada</h2>
    <div class="w-full column gap-3 mt-3">
      <p class="solicitada">
        Has solicitado una licencia. Serás notificado una vez que se apruebe o
        rechace.
      </p>
      <div class="rowCenter gap-6">
        <div class="fecha">
          <p>Comienzo</p>
          <p>{{ formatDate(fechaLicencia.comienzo) }}</p>
        </div>
        <div class="fecha">
          <p>Fin</p>
          <p>{{ formatDate(fechaLicencia.fin) }}</p>
        </div>
      </div>
      <router-link class="primaryButtonLink" :to="routes.Profile">
        Volver a mi perfil
      </router-link>
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
      fechaLicencia: {
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
