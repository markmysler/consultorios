<template>
	<main class="w-full">
		<h2>Licencia agregada</h2>
		<div class="w-full column gap-3 mt-3" v-if="licenciaAgregada">
			<p class="solicitada">
				Se ha agregado una licencia para el profesional
				<span class="font-bold">{{ nombreProfesional }}.</span>
			</p>
			<div class="rowCenter gap-6">
				<div class="fecha">
					<p>Comienzo</p>
					<p>{{ formatDate(new Date(licenciaAgregada.inicio)) }}</p>
				</div>
				<div class="fecha">
					<p>Fin</p>
					<p>{{ formatDate(new Date(licenciaAgregada.fin)) }}</p>
				</div>
			</div>
			<div class="rowCenter gap-6">
				<div class="fecha">
					<p>Tipo de licencia</p>
					<p>{{ licenciaAgregada.tipo }}</p>
				</div>
				<div class="fecha" v-if="licenciaAgregada.anio">
					<p>Año de la licencia</p>
					<p>{{ licenciaAgregada.anio }}</p>
				</div>
			</div>
			<div class="w-full column gap-2 mt-3">
				<router-link class="primaryButtonLink" :to="routes.Licencias">
					Ir al Licencias
				</router-link>
			</div>
		</div>
	</main>
</template>

<script>
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
import { useRoute } from "vue-router";

export default {
	name: "RequestLicenciaConfirmationView",
	data() {
		return {
			routes: ROUTES_NAMES,
			route: useRoute(),
			licenciaAgregada: null,
			nombreProfesional: "",
		};
	},
	methods: {
		formatDate(dateString) {
			const options = {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			};
			return new Date(dateString).toLocaleDateString("es-ES", options);
		},
	},
	mounted() {
		this.licenciaAgregada = JSON.parse(this.route.query.licenciaAgregada);
		this.nombreProfesional = this.route.query.nombreProfesional;
		console.log(this.licenciaAgregada);
		console.log(this.nombreProfesional);
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
