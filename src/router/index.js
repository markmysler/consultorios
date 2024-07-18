import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";

// Auth
import LandingView from "../views/auth/LandingView.vue";
import LoginView from "../views/auth/LoginView.vue";
import ResetPasswordView from "../views/auth/ResetPasswordView.vue";
import ResetPasswordConfirmationView from "../views/auth/ResetPasswordConfirmationView.vue";
// Profesional
import SearchView from "../views/profesional/SearchView.vue";
import SearchResultsView from "../views/profesional/SearchResultsView.vue";
import SectorsView from "../views/profesional/SectorsView.vue";
import SectorDetailsView from "../views/profesional/SectorDetailsView.vue";
import ConsultorioDetailsView from "../views/profesional/ConsultorioDetailsView.vue";
import ProfesionalDetailsView from "../views/profesional/ProfesionalDetailsView.vue";
import ProfileView from "../views/profesional/ProfileView.vue";
import ChangePasswordView from "../views/profesional/ChangePasswordView.vue";
import ChangePasswordConfirmationView from "../views/profesional/ChangePasswordConfirmationView.vue";
import SupportView from "../views/profesional/SupportView.vue";
import SupportConfirmationView from "../views/profesional/SupportConfirmationView.vue";
// Admin
import AdminView from "../views/admin/AdminView.vue";
import ReportsView from "../views/admin/ReportsView.vue";
import LicenciasView from "../views/admin/LicenciasView.vue";
import ActiveLicenciasView from "../views/admin/ActiveLicenciasView.vue";
import PendingLicenciasView from "../views/admin/PendingLicenciasView.vue";
import RejectedLicenciasView from "../views/admin/RejectedLicenciasView.vue";
import AddLicenciaView from "../views/admin/AddLicenciaView.vue";

// Layouts
import LayoutNoAuth from "@/layouts/LayoutNoAuth.vue";
import LayoutAuth from "@/layouts/LayoutAuth.vue";
import { getAuth } from "firebase/auth";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		// Auth
		{
			path: ROUTES_NAMES.Landing,
			component: LayoutNoAuth,
			children: [{ path: "", component: LandingView, name: "Landing" }],
		},
		{
			path: ROUTES_NAMES.Login,
			component: LayoutNoAuth,
			children: [{ path: "", component: LoginView, name: "Login" }],
		},
		{
			path: ROUTES_NAMES.ResetPassword,
			component: LayoutNoAuth,
			children: [
				{
					path: "",
					component: ResetPasswordView,
					name: "ResetPassword",
				},
			],
		},
		{
			path: ROUTES_NAMES.ResetPasswordConfirmation,
			component: LayoutNoAuth,
			children: [
				{
					path: "",
					component: ResetPasswordConfirmationView,
					name: "ResetPasswordConfirmation",
				},
			],
		},
		// Profesional
		{
			path: ROUTES_NAMES.Search,
			component: LayoutAuth,
			children: [
				{
					path: "",
					component: SearchView,
					name: "Search",
				},
			],
			meta: { requiresAuth: true },
		},
		{
			path: ROUTES_NAMES.SearchResults,
			component: LayoutAuth,
			children: [
				{
					path: "",
					component: SearchResultsView,
					name: "SearchResults",
				},
			],
			meta: { requiresAuth: true },
		},
		{
			path: ROUTES_NAMES.Sectors,
			component: LayoutAuth,
			children: [
				{
					path: "",
					component: SectorsView,
					name: "Sectors",
				},
			],
			meta: { requiresAuth: true },
		},
		{
			path: ROUTES_NAMES.SectorDetails,
			component: LayoutAuth,
			children: [
				{
					path: "",
					component: SectorDetailsView,
					name: "SectorDetails",
				},
			],
			meta: { requiresAuth: true },
		},
		{
			path: ROUTES_NAMES.ConsultorioDetails,
			component: LayoutAuth,
			children: [
				{
					path: "",
					component: ConsultorioDetailsView,
					name: "ConsultorioDetails",
				},
			],
			meta: { requiresAuth: true },
		},
		{
			path: ROUTES_NAMES.ProfesionalDetails,
			component: LayoutAuth,
			children: [
				{
					path: "",
					component: ProfesionalDetailsView,
					name: "ProfesionalDetails",
				},
			],
			meta: { requiresAuth: true },
		},
		{
			path: ROUTES_NAMES.Profile,
			component: LayoutAuth,
			children: [
				{
					path: "",
					component: ProfileView,
					name: "Profile",
				},
			],
			meta: { requiresAuth: true },
		},
		{
			path: ROUTES_NAMES.ChangePassword,
			component: LayoutAuth,
			children: [
				{
					path: "",
					component: ChangePasswordView,
					name: "ChangePassword",
				},
			],
			meta: { requiresAuth: true },
		},
		{
			path: ROUTES_NAMES.ChangePasswordConfirmation,
			component: LayoutAuth,
			children: [
				{
					path: "",
					component: ChangePasswordConfirmationView,
					name: "ChangePasswordConfirmation",
				},
			],
			meta: { requiresAuth: true },
		},
		{
			path: ROUTES_NAMES.Support,
			component: LayoutAuth,
			children: [
				{
					path: "",
					component: SupportView,
					name: "Support",
				},
			],
			meta: { requiresAuth: true },
		},
		{
			path: ROUTES_NAMES.SupportConfirmation,
			component: LayoutAuth,
			children: [
				{
					path: "",
					component: SupportConfirmationView,
					name: "SupportConfirmation",
				},
			],
			meta: { requiresAuth: true },
		},
		// Admin
		{
			path: ROUTES_NAMES.Admin,
			component: LayoutAuth,
			children: [
				{
					path: "",
					component: AdminView,
					name: "Admin",
				},
			],
			meta: { requiresAuth: true, requiresRole: "admin" },
		},
		{
			path: ROUTES_NAMES.Reports,
			component: LayoutAuth,
			children: [
				{
					path: "",
					component: ReportsView,
					name: "Reports",
				},
			],
			meta: { requiresAuth: true, requiresRole: "admin" },
		},
		{
			path: ROUTES_NAMES.Licencias,
			component: LayoutAuth,
			children: [
				{
					path: "",
					component: LicenciasView,
					name: "Licencias",
				},
			],
			meta: { requiresAuth: true, requiresRole: "admin" },
		},
		{
			path: ROUTES_NAMES.ActiveLicencias,
			component: LayoutAuth,
			children: [
				{
					path: "",
					component: ActiveLicenciasView,
					name: "ActiveLicencias",
				},
			],
			meta: { requiresAuth: true, requiresRole: "admin" },
		},
		{
			path: ROUTES_NAMES.PendingLicencias,
			component: LayoutAuth,
			children: [
				{
					path: "",
					component: PendingLicenciasView,
					name: "PendingLicencias",
				},
			],
			meta: { requiresAuth: true, requiresRole: "admin" },
		},
		{
			path: ROUTES_NAMES.RejectedLicencias,
			component: LayoutAuth,
			children: [
				{
					path: "",
					component: RejectedLicenciasView,
					name: "RejectedLicencias",
				},
			],
			meta: { requiresAuth: true, requiresRole: "admin" },
		},
		{
			path: ROUTES_NAMES.AddLicencia,
			component: LayoutAuth,
			children: [
				{
					path: "",
					component: AddLicenciaView,
					name: "AddLicencia",
				},
			],
			meta: { requiresAuth: true, requiresRole: "admin" },
		},
	],
});

router.beforeEach((to, from, next) => {
	const auth = getAuth(); // Your authentication store
	const user = auth.currentUser;
	const store = useUserStore();
	const userRole = store.userRole;

	if (to.matched.some((record) => record.meta.requiresAuth) && !user) {
		// Restricted route requires authentication
		next(ROUTES_NAMES.Login);
	} else {
		if (to.meta.requiresRole && to.meta.requiresRole !== userRole) {
			// User role does not match the required role, redirect or show an error
			next(ROUTES_NAMES.Search); // Redirect to home or any other page
		} else {
			// Role is correct or not required, proceed
			next();
		}
	}
});

export default router;
