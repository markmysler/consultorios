import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateProfileView from "../views/CreateProfileView.vue";
import CreateReservationView from "../views/CreateReservationView.vue";
import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";
import AreaView from "../views/AreaView.vue";
import ConsultorioView from "../views/ConsultorioView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/inicio",
			name: "Inicio",
			component: HomeView,
		},
		{
			path: "/crear-perfil",
			name: "CrearPerfil",
			component: CreateProfileView,
		},
		{
			path: "/crear-reserva",
			name: "CrearReserva",
			component: CreateReservationView,
		},
		{
			path: "/iniciar-sesion",
			name: "IniciarReserva",
			component: LoginView,
		},
		{
			path: "/registrarse",
			name: "Registrarse",
			component: SignUpView,
		},
		{
			path: "/area/:id",
			name: "Area",
			component: AreaView,
		},
		{
			path: "/consultorio/:id",
			name: "Consultorio",
			component: ConsultorioView,
		},
	],
});

export default router;
