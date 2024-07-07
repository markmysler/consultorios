<template>
	<div
		class="header flex flex-row-reverse justify-content-center gap-3 relative py-2"
	>
		<h1>Consultorios</h1>
		<Sidebar
			style="background-color: var(--color-grey)"
			v-model:visible="headerStore.visible"
			:showCloseIcon="false"
			v-if="store.user !== null"
		>
			<ul class="flex flex-column align-items-start gap-2 p-0">
				<li
					v-for="(item, index) in menu"
					:key="index"
					class="border-round-lg py-2 pl-2"
				>
					<router-link
						class="flex align-items-start gap-3 p-0"
						:to="'/' + item.url"
					>
						<i :class="'pi ' + item.icon"></i>
						{{ item.name }}
					</router-link>
				</li>
				<li class="border-round-lg py-2 pl-2" @click="logOut">
					<div class="flex align-items-start gap-3 p-0">
						<i class="pi pi-sign-out"></i>
						<p>Cerrar sesión</p>
					</div>
				</li>
			</ul>
		</Sidebar>
		<Button
			class="hamburger absolute"
			style="top: 20%; left: 3%"
			:text="true"
			icon="pi pi-bars"
			@click="headerStore.visible = true"
			v-if="store.user !== null"
		/>
	</div>
</template>

<script>
import Sidebar from "primevue/sidebar";
import { signOut, getAuth } from "firebase/auth";
import { useUserStore } from "../stores/user.js";
import { useHeaderStore } from "../stores/header.js";
import { useRouter } from "vue-router";
export default {
	name: "HeaderComponent",
	components: {
		Sidebar,
	},
	data() {
		return {
			store: useUserStore(),
			headerStore: useHeaderStore(),
			router: useRouter(),
			auth: getAuth(),
			menu: [
				{
					name: "Inicio",
					url: "inicio",
					icon: "pi-home",
				},
				{
					name: "Crear reserva",
					url: "crear-reserva",
					icon: "pi-calendar",
				},
				{
					name: "Agregar profesional",
					url: "agregar-profesional",
					icon: "pi-user",
				},
			],
		};
	},
	methods: {
		async logOut() {
			await signOut(this.auth).then(() => {
				this.store.user = null;
				this.headerStore.visible = false;
				this.router.push("/");
			});
		},
	},
};
</script>

<style scoped>
.header {
	width: 100%;
	background-color: var(--color-light-blue);
	color: var(--color-blue);
}
.header h1 {
	font-weight: 600;
}

/* REVISAR */

.hamburger {
	color: var(--color-blue);
}
:deep() .pi-bars {
	font-size: 1.5rem;
}
.p-sidebar {
	background: var(--color-grey) !important;
}
ul {
	list-style: none;
}
ul li {
	cursor: pointer;
}
ul li:hover {
	background: var(--color-grey) !important;
}
ul li a:hover {
	background: none;
}
ul li a,
ul li p {
	font-size: 1.15rem;
	font-weight: 500;
	color: var(--color-blue);
}
ul li i {
	font-size: 1.5rem;
	color: var(--color-blue);
}
</style>
