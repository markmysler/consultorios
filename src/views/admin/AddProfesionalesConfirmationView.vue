<template>
  <main class="w-full">
    <h2>Profesional agregado</h2>
    <div class="w-full column gap-3 mt-3">
      <p class="solicitada">
        Se ha agregado a
        <span class="font-bold"
          >{{ profesional.nombre }} {{ profesional.apellido }}</span
        >
        como nuevo profesional
      </p>
      <p class="solicitada">
        {{ profesional.nombre }} {{ profesional.apellido }} podrá ingresar a su
        cuenta con su correo electrónico como usuario, y su CUIL como
        contraseña. Una vez que ingrese podrá cambiar su contraseña desde la
        sección “Mi Perfil”.
      </p>
      <div class="w-full column gap-2 mt-3">
        <router-link class="primaryButtonLink" :to="routes.AddProfesionalSchedule">
          Agregar Consultorios a {{ formatName(profesional.nombre) }}
          {{ profesional.apellido }}
        </router-link>
        <router-link class="secondaryButtonLink" :to="routes.AddProfesionales">
          Agregar otro profesional
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";

export default {
  name: "AddProfesionalesConfirmationView",
  data() {
    return {
      routes: ROUTES_NAMES,
      profesional: {
        nombre: "Juan",
        apellido: "Perez",
      },
    };
  },
  methods: {
    formatName(name) {
      return name.charAt(0).toUpperCase() + ".";
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
