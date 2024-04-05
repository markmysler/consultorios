<template>
	<div
		style="max-height: 90vh"
		class="w-full h-screen flex flex-column justify-content-center align-items-center gap-5"
	>
		<Button
			label="Iniciar Sesion"
			class="primaryButton"
			@click.prevent="goTo(ROUTES_NAMES.IniciarSesion)"
		/>
		<Button
			label="Registrarse"
			class="primaryButton"
			@click.prevent="goTo(ROUTES_NAMES.Registrarse)"
		/>
	</div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
const router = useRouter();
const goTo = (url) => {
	router.push(url);
};
</script>
