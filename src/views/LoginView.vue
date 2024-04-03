<template>
	<h2>Login</h2>
	<p><input type="text" placeholder="Email" v-model="email" /></p>

	<p><input type="password" placeholder="Contraseña" v-model="password" /></p>

	<p><button @click="login">Ingresar</button></p>
	<div v-for="error in errors" :key="error">
		<p>{{ error }}</p>
	</div>
</template>
<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user.js";

const store = useUserStore();
const errors = ref([]);
const errorMap = {};
const email = ref("");
const password = ref("");
const auth = getAuth();
const router = useRouter();

const login = () => {
	errors.value = [];
	signInWithEmailAndPassword(auth, email.value, password.value)
		.then((userCredential) => {
			const user = userCredential.user;
			store.user = user;
			router.push("/inicio");
		})
		.catch((error) => {
			const errorCode = error.code;
			if (errorMap[errorCode]) {
				errors.value.push(errorMap[errorCode]);
			} else {
				errors.value.push(errorCode);
			}
		});
};
</script>
