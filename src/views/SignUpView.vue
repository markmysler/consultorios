<template>
	<div class="w-11 columnAlignCenter">
		<h2>Registrarse</h2>
		<div class="w-full columnAlignCenter gap-7 mt-8">
			<FloatLabel>
				<InputText
					id="displayName"
					v-model="displayName"
					autocomplete="true"
				/>
				<label for="displayName">Nombre de usuario</label>
			</FloatLabel>
			<FloatLabel>
				<InputText id="email" v-model="email" autocomplete="true" />
				<label for="email">Correo electrónico</label>
			</FloatLabel>
			<FloatLabel>
				<Password id="password" v-model="password" :feedback="false" />
				<label for="password">Contraseña</label>
			</FloatLabel>
			<FloatLabel>
				<Password
					id="password2"
					v-model="password2"
					:feedback="false"
				/>
				<label for="password2">Repetir contraseña</label>
			</FloatLabel>

			<div class="w-full columnAlignCenter gap-3">
				<Button
					label="Crear cuenta"
					class="primaryButton"
					@click="register"
				/>
				<div v-for="error in errors" :key="error">
					<p class="font-bold text-red-500">
						{{ errorMap[error] ? errorMap[error] : error }}
					</p>
				</div>
				<div class="flex align-items-center gap-2">
					<p>¿Ya tenés una cuenta?</p>
					<router-link :to="ROUTES_NAMES.IniciarSesion"
						>Iniciar sesión</router-link
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user.js";
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
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
			.then(async (userCredential) => {
				const user = userCredential.user;
				store.user = user;
				await updateProfile(user, {
					displayName: displayName.value,
				}).then(() => {
					router.push("/inicio");
				});
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

<style scoped>
a {
	text-decoration: underline;
	color: white;
	align-self: flex-end;
}
</style>
