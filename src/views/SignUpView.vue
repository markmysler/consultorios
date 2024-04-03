<template>
	<h2>Signup</h2>
	<p><input type="text" placeholder="Email" v-model="email" /></p>
	<p>
		<input
			type="text"
			placeholder="Nombre de usuario"
			v-model="displayName"
		/>
	</p>
	<p><input type="password" placeholder="Contraseña" v-model="password" /></p>
	<p>
		<input
			type="password"
			placeholder="Repetir contraseña"
			v-model="password2"
		/>
	</p>
	<p><button @click="register">Crear cuenta</button></p>
	<div v-for="error in errors" :key="error">
		<p>{{ error }}</p>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user.js";
import {
	createUserWithEmailAndPassword,
	getAuth,
	updateProfile,
} from "firebase/auth";

const errorMap = {
	"auth/invalid-email": "Email invalido",
	"auth/weak-password": "La contraseña debe tener al menos 6 caracteres",
	"auth/email-already-in-use": "Un usuario con ese email ya existe",
};
const auth = getAuth();
const store = useUserStore();
const email = ref("");
const displayName = ref("");
const password = ref("");
const password2 = ref("");
const router = useRouter();
const errors = ref([]);
const register = () => {
	errors.value = [];
	if (password.value === password2.value) {
		createUserWithEmailAndPassword(auth, email.value, password.value)
			.then((userCredential) => {
				const user = userCredential.user;
				store.user = user;
				updateProfile(user, { displayName: displayName.value });
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
	} else {
		errors.value.push("Las contraseñas deben ser iguales");
	}
};
</script>
