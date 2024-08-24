<template>
  <main class="w-full">
    <h2>Perfil</h2>
    <div class="w-full mt-4">
      <div class="rowCenter gap-1 mb-3">
        <p class="nombreCompleto">{{ perfil.nombre }}</p>
        <p class="nombreCompleto">{{ perfil.apellido }}</p>
      </div>
      <div class="column gap-3">
        <div class="rowCenter gap-1">
          <div class="w-6">
            <p class="titulo text-blue">CUIL</p>
            <p>{{ perfil.cuil }}</p>
          </div>
          <div class="w-6">
            <p class="titulo text-blue">Turno</p>
            <div class="rowCenter flex-wrap gap-2">
              <p v-for="(turno, index) in perfil.turnos" :key="index">
                {{ capitalize(turno) }}
              </p>
            </div>
          </div>
        </div>
        <div>
          <p class="titulo text-blue">Especialidad</p>
          <div class="rowCenter flex-wrap gap-2">
            <p
              v-for="(especialidad, index) in perfil.especialidades"
              :key="index">
              {{ capitalize(especialidad) }}
            </p>
          </div>
        </div>
        <div>
          <p class="titulo text-blue">Sub Especialidad</p>
          <div class="rowCenter flex-wrap gap-2">
            <p
              v-for="(subespecialidad, index) in perfil.subespecialidades"
              :key="index">
              {{ capitalize(subespecialidad) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- Cambiar rutas de botones -->
    <div class="w-full column gap-2 mt-5 mb-3">
      <router-link to="/" class="primaryButtonLink"
        >Ver mis consultorios</router-link
      >
      <router-link to="/" class="secondaryButtonLink">Licencias</router-link>
    </div>
    <div class="w-full rowSpaceBetween links mt-3 mb-6">
      <Button
        class="text-blue"
        label="Cambiar contraseña"
        text
        @click.prevent="visibleContrasena = true">
      </Button>
      <Button
        class="text-red"
        label="Cerrar sesion"
        text
        @click.prevent="visibleSesion = true">
      </Button>
    </div>
    <div class="w-full flex justify-content-end mb-3">
      <router-link
        class="rowCenter gap-2 bg-dark-gray border-round-2xl text-blue no-underline py-1 px-3"
        :to="routes.Support">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 23v-2h7v-1h-4v-8h4v-1q0-2.9-2.05-4.95T12 4T7.05 6.05T5 11v1h4v8H5q-.825 0-1.412-.587T3 18v-7q0-1.85.713-3.488T5.65 4.65t2.863-1.937T12 2t3.488.713T18.35 4.65t1.938 2.863T21 11v10q0 .825-.587 1.413T19 23z"></path>
        </svg>
        Soporte
      </router-link>
    </div>
    <Dialog
      class="w-full perfilDialog mx-3"
      v-model:visible="visibleContrasena">
      <div class="column gap-4 p-3">
        <p>¿Estas seguro que queres cambiar tu contraseña?</p>
        <div class="w-full rowCenter gap-3">
          <router-link
            class="w-6 h-3rem columnAlignCenter secondaryButtonLink"
            :to="routes.ChangePassword"
            >Si</router-link
          >
          <Button
            class="w-6 h-3rem primaryButton"
            label="No"
            @click.prevent="visibleContrasena = false"></Button>
        </div>
      </div>
    </Dialog>
    <Dialog class="w-full perfilDialog mx-3" v-model:visible="visibleSesion">
      <div class="column gap-4 p-3">
        <p>¿Estas seguro que queres cerrar sesión?</p>
        <div class="w-full rowCenter gap-3">
          <Button
            class="w-6 h-3rem secondaryButtonLink"
            label="Si"
            @click.prevent="logout()">
          </Button>
          <Button
            class="w-6 h-3rem primaryButton"
            label="No"
            @click.prevent="visibleSesion = false">
          </Button>
        </div>
      </div>
    </Dialog>
  </main>
</template>

<script>
  import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
  import { profesionales } from "@/constants/models.js";
  import { capitalize } from "vue";

  export default {
    name: "ProfileView",
    data() {
      return {
        routes: ROUTES_NAMES,
        perfil: profesionales[0],
        visibleContrasena: false,
        visibleSesion: false,
      };
    },
    methods: {
      capitalize,
    },
  };
</script>

<script setup>
  import { signOut, getAuth } from "firebase/auth";
  import { useUserStore } from "@/stores/user.js";

  import { useRouter } from "vue-router";

  const auth = getAuth();
  const store = useUserStore();
  const router = useRouter();
  const logout = async () => {
    await signOut(auth).then(() => {
      store.user = null;
      store.userData = null;
      store.userRole = null;
      router.push(ROUTES_NAMES.Login);
    });
  };
</script>

<style>
  .perfilDialog {
    border-radius: 10px;
  }

  .perfilDialog .p-dialog-header {
    justify-content: flex-end;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }

  .perfilDialog .p-dialog-content {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
</style>

<style scoped>
  .nombreCompleto {
    font-weight: 1rem;
    font-weight: 500;
  }

  p {
    font-size: 0.875rem;
    line-height: 18.23px;
  }

  .titulo {
    font-size: 0.625rem;
    font-weight: 500;
  }

  .primaryButtonLink,
  .secondaryButtonLink {
    font-weight: 700;
  }

  .links a,
  .links button {
    font-size: 0.875rem;
    font-weight: 500;
  }
</style>
