<template>
  <main class="w-full">
    <h2>Soporte</h2>
    <div class="confirmacion my-4">
      <p>Tu consulta fue enviada correctamente.</p>
      <p>Te contactaremos para poder asistirte.</p>
    </div>
		<router-link class="primaryButtonLink" :to="routes.Profile">Volver a mi perfil</router-link>
  </main>
</template>

<script>
import { ROUTES_NAMES } from '@/constants/ROUTES_NAMES';

export default {
  name: "SupportConfirmationView",
	data() {
		return {
			routes: ROUTES_NAMES
		}
	}
};
</script>

<style scoped>
	.confirmacion p {
		font-size: 0.875rem;
		font-weight: 600;
		line-height: 18.23px;
	}
</style>