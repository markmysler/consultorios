<template>
	<main class="w-full">
		<h2>Licencia solicitada</h2>
		<div class="w-full column gap-3 mt-3" v-if="licencia">
			<p class="solicitada">
				Has solicitado una licencia. Serás notificado una vez que se
				apruebe o rechace.
			</p>
			<div class="rowCenter gap-6">
				<div class="licenciaDiv">
					<p>Comienzo</p>
					<p>{{ formatDate(licencia.inicio) }}</p>
				</div>
				<div class="licenciaDiv">
					<p>Fin</p>
					<p>{{ formatDate(licencia.fin) }}</p>
				</div>
			</div>
			<div class="rowCenter gap-6">
				<div class="licenciaDiv">
					<p>Tipo de licencia</p>
					<p>{{ licencia.tipo }}</p>
				</div>
				<div v-if="licencia.anio" class="licenciaDiv">
					<p>Año de la licencia</p>
					<p>{{ licencia.anio }}</p>
				</div>
			</div>
			<div class="rowCenter gap-6">
				<div class="licenciaDiv">
					<p>Certificado de licencia</p>
					<img class="imagenLicencia" :src="licencia.imagen" />
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
import { useRoute, useRouter } from "vue-router";

export default {
	name: "RequestLicenciaConfirmationView",
	data() {
		return {
			route: useRoute(),
			router: useRouter(),
			routes: ROUTES_NAMES,
		};
	},
	methods: {
		formatDate(dateString) {
			if (!dateString) {
				return new Date();
			}
			const options = {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			};
			return new Date(dateString).toLocaleDateString("es-ES", options);
		},
	},
	mounted() {
		console.log(this.route.query.state);

		if (!this.licencia) {
			this.router.push(this.routes.RequestLicencia);
		}
	},
	computed: {
		licencia() {
			return JSON.parse(this.route.query.state) || {};
		},
	},
};
</script>

<style scoped>
.solicitada {
	font-size: 0.875rem;
	line-height: 18.23px;
}

.licenciaDiv p:first-child {
	font-size: 0.75rem;
	font-weight: 500;
	line-height: 15.62px;
}

.licenciaDiv p:last-child {
	font-weight: 700;
	color: var(--color-blue);
	line-height: 20.83px;
}

.imagenLicencia {
	max-width: 50%;
}
</style>
