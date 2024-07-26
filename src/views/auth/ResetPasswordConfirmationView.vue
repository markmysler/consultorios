<template>
  <div class="columnAlignCenter pt-5 px-4">
    <h2>Restablecer contraseña</h2>
    <p v-if="this.email" class="my-3">
      Se envió un correo electrónico a <b>{{ this.email }}</b> para poder
      reestablecer su contraseña.
    </p>
    <p>
      ¿El correo electrónico indicado no es correcto?
      <router-link class="modificar" :to="routes.ResetPassword"
        >Modificar.</router-link
      >
    </p>
    <router-link :to="routes.Login" class="primaryButtonLink mt-5"
      >Volver a Iniciar sesión</router-link
    >
  </div>
</template>

<script>
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "ResetPasswordConfirmationView",
  data() {
    return {
      routes: ROUTES_NAMES,
      route: useRoute(),
      router: useRouter(),
      email: "",
    };
  },
  mounted() {
    try {
      this.email = this.route.query.email;
			if (!this.email || this.email.length === 0) {
				this.router.push(this.routes.ResetPassword);
			}
			console.log(this.email);
    } catch (error) {
      this.router.push(this.routes.ResetPassword);
    }
  },
};
</script>

<style scoped>
.modificar {
  color: var(--color-black);
  font-weight: 500;
}
</style>
