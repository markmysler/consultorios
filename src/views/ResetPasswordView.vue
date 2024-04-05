<template>
	<div>
		<h2>Reestablecer contraseña</h2>

		<input type="text" v-model="email" />
		<button @click="sendEmail">Enviar email de reset</button>
	</div>
</template>

<script setup>
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ref } from "vue";

const auth = getAuth();
const email = ref("");
const sendEmail = () => {
	console.log("enviando");
	sendPasswordResetEmail(auth, email.value)
		.then((res) => {
			console.log(res);
		})
		.catch((error) => {
			console.log(error);
		});
};
</script>
