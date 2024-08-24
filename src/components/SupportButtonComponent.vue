<template>
	<div class="w-full flex justify-content-end">
		<router-link
			class="rowCenter gap-2 bg-dark-gray border-round-2xl text-blue no-underline py-1 px-3"
			:to="routes.Support"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="1em"
				height="1em"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					d="M12 23v-2h7v-1h-4v-8h4v-1q0-2.9-2.05-4.95T12 4T7.05 6.05T5 11v1h4v8H5q-.825 0-1.412-.587T3 18v-7q0-1.85.713-3.488T5.65 4.65t2.863-1.937T12 2t3.488.713T18.35 4.65t1.938 2.863T21 11v10q0 .825-.587 1.413T19 23z"
				></path>
			</svg>
			Soporte
		</router-link>
	</div>
</template>

<script setup>
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";

const routes = ROUTES_NAMES;
</script>
