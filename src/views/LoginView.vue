<template>
	<div class="w-11 columnAlignCenter">
		<h2>Iniciar sesión</h2>
		<div class="w-full columnAlignCenter gap-7 mt-8">
			<FloatLabel>
				<InputText id="email" v-model="email" autocomplete="true" />
				<label for="email">Correo electrónico</label>
			</FloatLabel>
			<FloatLabel>
				<Password id="password" v-model="password" :feedback="false" />
				<label for="password">Contraseña</label>
			</FloatLabel>

			<router-link class="mr-7" :to="ROUTES_NAMES.ResetPassword"
				>¿Olvidaste tu contraseña?</router-link
			>

			<div class="w-full columnAlignCenter gap-3">
				<Button label="Ingresar" class="primaryButton" @click="login" />
				<div v-for="error in errors" :key="error">
					<p class="font-bold text-red-500">
						{{ errorMap[error] ? errorMap[error] : error }}
					</p>
				</div>
				<div class="flex align-items-center gap-2">
					<p>¿No tenés una cuenta?</p>
					<router-link :to="ROUTES_NAMES.Registrarse"
						>Registrate</router-link
					>
				</div>
			</div>
		</div>
	</div>
</template>
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
	text-decoration: underline;
	color: white;
	align-self: flex-end;
}
</style>
