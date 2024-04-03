<template>
	<main>
		<h2>Inicio</h2>

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
	name: "HomeView",
};
</script>
<script setup>
import { signOut, getAuth } from "firebase/auth";
import { useCurrentUser } from "vuefire";
import { useUserStore } from "../stores/user.js";
import { useRouter } from "vue-router";

const auth = getAuth();
const user = useCurrentUser();
const store = useUserStore();
const router = useRouter();
const logout = async () => {
	await signOut(auth).then(() => {
		store.user = null;
		router.push("/");
	});
};
</script>
