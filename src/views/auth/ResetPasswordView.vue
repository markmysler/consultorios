<template>
	<div class="columnAlignCenter pt-5 px-4">
		<router-link
			class="goBack rowCenter align-self-start gap-2"
			:to="ROUTES_NAMES.Login"
		>
			<span class="pi pi-arrow-left"></span>
			Volver a Iniciar sesión
		</router-link>
		<h2 class="my-3">Reestablecer contraseña</h2>
		<div class="w-full column">
			<p class="ingrese">
				Ingrese el correo electrónico de su cuenta para poder
				reestablecer su contraseña.
			</p>
			<div class="w-full column gap-1 my-3">
				<label for="email">Correo electrónico</label>
				<InputText
					type="email"
					id="email"
					placeholder="juanperez@gmail.com"
					v-model="email"
					@input="validateEmail"
					autocomplete="true"
				/>
				<div class="error mt-1" v-if="validationErrors">
					<span class="pi pi-exclamation-circle"></span>
					<p>{{ validationErrors }}</p>
				</div>
				<div class="error align-items-start mt-1" v-if="error">
					<span class="pi pi-exclamation-circle"></span>
					<p>{{ error }}</p>
				</div>
			</div>
			<Button
				@click="sendEmail"
				:loading="loading"
				class="primaryButton"
				label="Restablecer contraseña"
			></Button>
		</div>
	</div>
</template>

<script setup>
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES.js";
import { db } from "@/firebase/init";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const auth = getAuth();
const email = ref("");
const error = ref(null);
const loading = ref(false);
const validationErrors = ref(null);
const router = useRouter();

const validateEmail = () => {
	if (!email.value) {
		validationErrors.value = "Ingrese un correo electrónico";
	} else if (!/.+@.+\..+/.test(email.value)) {
		validationErrors.value =
			"El correo electrónico debe incluír un @ y un . (punto)";
	} else {
		validationErrors.value = null;
	}
};

const sendEmail = async () => {
	validateEmail();
	if (!validationErrors.value) {
		loading.value = true;
		error.value = null;
		await checkUserExists(email.value).then((exists) => {
			if (exists) {
				sendPasswordResetEmail(auth, email.value)
					.then(() => {
						loading.value = false;
						router.push(ROUTES_NAMES.ResetPasswordConfirmation);
					})
					.catch((error) => {
						console.log(error);
						loading.value = false;
					});
			} else {
				loading.value = false;
				error.value =
					"Ninguna cuenta coincide con este correo electrónico. Ingrese un correo electrónico diferente.";
			}
		});
	}
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

<style scoped>
.goBack {
	text-decoration: none;
	font-size: 0.75rem;
	color: var(--color-blue);
}
.ingrese {
	font-size: 0.875rem;
}
</style>
