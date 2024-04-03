<template>
	<div>
		<Button
			label="Iniciar Sesion"
			severity="success"
			class="w-4"
			@click.prevent="goTo('/iniciar-sesion')"
		/>
		<Button
			label="Registrarse"
			severity="secondary"
			class="w-4"
			@click.prevent="goTo('/registrarse')"
		/>
	</div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goTo = (url) => {
	router.push(url);
};
</script>
