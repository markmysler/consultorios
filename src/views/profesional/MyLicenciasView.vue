<template>
  <main class="w-full">
    <h2>Mis Licencias</h2>
    <router-link :to="routes.RequestLicencia" class="primaryButtonLink my-4">
      Solicitar una licencia
    </router-link>

    <div class="w-full column gap-3" v-if="hayLicencias">
      <!-- Licencias aprobadas -->
      <div class="column gap-2" v-if="licenciasAprobadas.length > 0">
        <p class="titleLicencia">Licencias aprobadas</p>
        <div
          v-for="(aprobada, index) in licenciasAprobadas"
          :key="index"
          class="w-full licenciaCard rowCenter border-round-md"
        >
          <div class="nombre bg-light-blue py-2 px-3">
            <p class="text-blue text-center font-bold">
              {{ getProfessionalFullName(aprobada.cuil) }}
            </p>
          </div>
          <div class="fecha bg-dark-gray p-2">
            <p class="text-blue text-center font-bold">
              {{ formatDate(aprobada.inicio) }} - {{ formatDate(aprobada.fin) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Licencias pendientes -->
      <div class="column gap-2" v-if="licenciasPendientes.length > 0">
        <p class="titleLicencia">Licencias pendientes</p>
        <div
          v-for="(pendiente, index) in licenciasPendientes"
          :key="index"
          class="w-full licenciaCard rowCenter border-round-md"
        >
          <div class="nombre bg-light-blue py-2 px-3">
            <p class="text-blue text-center font-bold">
              {{ getProfessionalFullName(pendiente.cuil) }}
            </p>
          </div>
          <div class="fecha bg-dark-gray p-2">
            <p class="text-blue text-center font-bold">
              {{ formatDate(pendiente.inicio) }} - {{ formatDate(pendiente.fin) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Licencias rechazadas -->
      <div class="column gap-2" v-if="licenciasRechazadas.length > 0">
        <p class="titleLicencia">Licencias rechazadas</p>
        <div
          v-for="(rechazada, index) in licenciasRechazadas"
          :key="index"
          class="w-full licenciaCard rowCenter border-round-md"
        >
          <div class="nombre bg-light-blue p-2">
            <p class="text-blue text-center font-bold">
              {{ getProfessionalFullName(rechazada.cuil) }}
            </p>
          </div>
          <div class="fecha bg-dark-gray py-2 px-3">
            <p class="text-blue text-center font-bold">
              {{ formatDate(rechazada.inicio) }} - {{ formatDate(rechazada.fin) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p>No tienes licencias registradas.</p>
    </div>
  </main>
</template>

<script>
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
import { licencias } from "@/constants/models";
import { profesionales } from "@/constants/models";

export default {
  name: "MyLicenciasView",
  data() {
    return {
      routes: ROUTES_NAMES,
      licenciasAprobadas: licencias.filter(
        (licencia) => licencia.estado === "aprobada"
      ),
      licenciasPendientes: licencias.filter(
        (licencia) => licencia.estado === "pendiente"
      ),
      licenciasRechazadas: licencias.filter(
        (licencia) => licencia.estado === "rechazada"
      ),
    };
  },
  computed: {
    hayLicencias() {
      return (
        this.licenciasAprobadas.length > 0 ||
        this.licenciasPendientes.length > 0 ||
        this.licenciasRechazadas.length > 0
      );
    },
  },
  methods: {
    formatDate(dateString) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      return new Date(dateString).toLocaleDateString("es-ES", options);
    },
    getProfessionalFullName(cuil) {
      const prof = profesionales.find((prof) => prof.cuil === cuil);
      return `${prof.nombre} ${prof.apellido}`;
    },
  },
};
</script>

<style scoped>
.titleLicencia {
  font-weight: 700;
}

.licenciaCard {
  box-shadow: 0px 4px 4px 0px #00000040;
  font-size: 0.75rem;
}

.nombre {
  width: 36%;
  border-top-left-radius: 0.313rem;
  border-bottom-left-radius: 0.313rem;
}

.fecha {
  width: 65%;
  border-top-right-radius: 0.313rem;
  border-bottom-right-radius: 0.313rem;
}
</style>
