import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddProfesionalView from "../views/AddProfesionalView.vue";
import CreateReservationView from "../views/CreateReservationView.vue";
import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";
import AreaView from "../views/AreaView.vue";
import ConsultorioView from "../views/ConsultorioView.vue";
import LandingView from "../views/LandingView.vue";
import ResetPasswordView from "../views/ResetPasswordView.vue";
import { useUserStore } from "@/stores/user";
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: ROUTES_NAMES.LandingPage,
			name: "LandingPage",
			component: LandingView,
		},
		{
			path: ROUTES_NAMES.Inicio,
			name: "Inicio",
			component: HomeView,
			meta: { requiresAuth: false },
		},
		{
			path: ROUTES_NAMES.AgregarProfesional,
			name: "AgregarProfesional",
			component: AddProfesionalView,
			meta: { requiresAuth: false },
		},
		{
			path: ROUTES_NAMES.CrearReserva,
			name: "CrearReserva",
			component: CreateReservationView,
			meta: { requiresAuth: false },
		},
		{
			path: ROUTES_NAMES.IniciarSesion,
			name: "IniciarSesion",
			component: LoginView,
		},
		{
			path: ROUTES_NAMES.ResetPassword,
			name: "ResetPassword",
			component: ResetPasswordView,
		},
		{
			path: ROUTES_NAMES.Registrarse,
			name: "Registrarse",
			component: SignUpView,
		},
		{
			path: ROUTES_NAMES.Area + "/:id",
			name: "Area",
			component: AreaView,
			meta: { requiresAuth: false },
		},
		{
			path: ROUTES_NAMES.Consultorio + "/:id",
			name: "Consultorio",
			component: ConsultorioView,
			meta: { requiresAuth: false },
		},
	],
});

router.beforeEach((to, from, next) => {
	const auth = useUserStore(); // Your authentication store
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		// Restricted route requires authentication
		if (!auth.user) {
			// User is not logged in, redirect to login page
			next("/");
		} else {
			// User is logged in, proceed to the restricted route
			next();
		}
	} else {
		// Non-restricted route, proceed
		next();
	}
});

export default router;
