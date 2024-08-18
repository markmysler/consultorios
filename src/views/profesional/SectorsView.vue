<template>
	<main class="w-full">
		<h2>Sectores</h2>
		<div
			class="w-100 flex flex-wrap justify-content-between row-gap-3 mt-4"
		>
			<router-link
				:to="routes.SectorDetails + slugs[item]"
				:key="index"
				v-for="(item, index) in Object.keys(slugs)"
			>
				{{ item }}
			</router-link>
		</div>
	</main>
</template>

<script>
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";

export default {
	name: "SectorsView",
	data() {
		return {
			routes: ROUTES_NAMES,
			slugs: {
				A: "/A",
				B: "/B",
				C: "/C",
				Infectología: "/Infectologia",
				Oncología: "/OncologiaCuidadosPaliativos",
				"C. de prácticas": "/CentralPracticas",
				"Pasillo ala Ruggeri": "/PasilloRuggeri",
			},
		};
	},
};
</script>

<style scoped>
a {
	width: 48.2%;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	background-color: var(--color-dark-gray);
	box-shadow: 0px 4px 4px 0px #00000040;
	border-radius: 5px;
	text-decoration: none;
	font-size: 0.875rem;
	font-weight: 600;
	color: var(--color-blue);
	padding: 0.625rem;
}

a:last-child {
	width: 100%;
}
</style>
