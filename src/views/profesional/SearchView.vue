<template>
	<main>
		<h2>Inicio</h2>
		<router-link :to="routes.Admin">ADMIN</router-link>
		<Button label="Felicidades" severity="warning" class="w-6" />
		<p v-if="user">{{ user.displayName }}</p>
		<Button
			label="Cerrar sesion"
			severity="danger"
			class="w-6"
			@click.prevent="logout()"
		/>
	</main>
</template>
<script>
export default {
	name: "SearchView",
	data() {
		return {
			routes: ROUTES_NAMES,
		};
	},
};
</script>
<script setup>
import { signOut, getAuth } from "firebase/auth";
import { useCurrentUser } from "vuefire";
import { useUserStore } from "@/stores/user.js";
import { useRouter } from "vue-router";
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";

const auth = getAuth();
const user = useCurrentUser();
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
