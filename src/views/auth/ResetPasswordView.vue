<template>
	<div>
		<h2>Reestablecer contraseña</h2>

		<input type="text" v-model="email" />
		<button @click="sendEmail">Enviar email de reset</button>
	</div>
</template>

<script setup>
import { db } from "@/firebase/init";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { ref } from "vue";

const auth = getAuth();
const email = ref("");
const sendEmail = async () => {
	console.log("enviando");
	await checkUserExists(email.value).then((exists) => {
		if (exists) {
			sendPasswordResetEmail(auth, email.value)
				.then((res) => {
					console.log(res);
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			console.log("no existe usuario con ese email");
		}
	});
};
async function checkUserExists(email) {
	try {
		const q = query(collection(db, "users"), where("email", "==", email));
		const querySnapshot = await getDocs(q);
		return !querySnapshot.empty;
	} catch (error) {
		console.error("Error checking user:", error);
		return false;
	}
}
</script>
