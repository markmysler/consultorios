<template>
	<main class="w-full justify-content-between">
		<div class="columnAlignCenter">
			<h2>Cambiar contraseña</h2>
			<p v-if="this.email" class="my-3">
				Se envió un correo electrónico a <b>{{ this.email }}</b> para
				poder cambiar su contraseña.
			</p>
			<router-link :to="routes.Profile" class="primaryButtonLink mt-5"
				>Volver a mi perfil</router-link
			>
		</div>
		<SupportButtonComponent />
	</main>
</template>

<script>
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
import { useRoute, useRouter } from "vue-router";
import SupportButtonComponent from "@/components/SupportButtonComponent.vue";

export default {
	name: "ChangePasswordConfirmationView",
	components: {
		SupportButtonComponent,
	},
	data() {
		return {
			routes: ROUTES_NAMES,
			route: useRoute(),
			router: useRouter(),
			email: "",
		};
	},
	mounted() {
		try {
			this.email = this.route.query.email;
			if (!this.email || this.email.length === 0) {
				this.router.push(this.routes.ResetPassword);
			}
		} catch (error) {
			this.router.push(this.routes.Profile);
		}
	},
};
</script>
