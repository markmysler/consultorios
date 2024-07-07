<template>
	<div class="columnAlignCenter">
		<h2>Iniciar sesión</h2>
		<div class="w-full columnAlignCenter gap-5 mt-5">
			<div class="column">
				<label for="email">Correo electrónico</label>
				<InputText type="email" id="email" v-model="email" autocomplete="true" />
			</div>
			<div class="column">
				<label for="password">Contraseña</label>
				<Password type="password" id="password" v-model="password" toggleMask :feedback="false" />
			</div>

			<router-link :to="ROUTES_NAMES.ResetPassword">¿Olvidaste tu contraseña?</router-link>

			<div class="w-full columnAlignCenter gap-3">
				<PrimaryButtonComponent label="Iniciar Sesión" @click="login" />
				<div v-for="error in errors" :key="error">
					<p class="font-bold text-red-500">
						{{ errorMap[error] ? errorMap[error] : error }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PrimaryButtonComponent from "@/components/buttons/PrimaryButtonComponent.vue"

export default {
	components: {
		PrimaryButtonComponent,
	}
}
</script>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user.js";
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";

const store = useUserStore();
const errors = ref([]);
const errorMap = {
	"auth/invalid-email": "El email es inválido",
	"auth/invalid-credential": "El usuario o contraseña son incorrectos",
	"auth/missing-password": "Escribe una contraseña",
};
const email = ref("");
const password = ref("");
const auth = getAuth();
const router = useRouter();

const login = () => {
	errors.value = [];
	if (email.value.length > 0 && password.value.length > 0) {
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
	} else {
		errors.value.push("El email y la contraseña no pueden estar vacíos");
	}
};
</script>

<style scoped>
a {
	color: var(--color-black);
}
</style>
