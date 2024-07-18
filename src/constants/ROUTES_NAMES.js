export const ROUTES_NAMES = {
	// No auth
	Landing: "/",
	Login: "/iniciar-sesion",
	ResetPassword: "/restablecer-contrasena",
	ResetPasswordConfirmation: "/restablecer-contrasena/confirmacion",
	// Auth
	Search: "/buscador",
	SearchResults: "/buscador/resultados",
	Sectors: "/sectores",
	SectorDetails: "/sectores/:sector_id",
	ConsultorioDetails: "/sectores/:sector_id/:consultorio_id",
	ProfesionalDetails: "/profesional/:profesional_id",
	Profile: "/perfil",
	// Mis licencias?
	ChangePassword: "/perfil/cambiar-contrasena",
	ChangePasswordConfirmation: "/perfil/cambiar-contrasena/confirmacion",
	Support: "/soporte",
	SupportConfirmation: "/soporte/confirmacion",
	// Admin
	Admin: "/admin",
	Reports: "/admin/reports",
	Licencias: "/admin/licencias",
	ActiveLicencias: "/admin/licencias/activas",
	PendingLicencias: "/admin/licencias/pendientes",
	RejectedLicencias: "/admin/licencias/rechazadas",
	AddLicencia: "/admin/licencias/agregar",
};
