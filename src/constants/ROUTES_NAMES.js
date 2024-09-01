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
	SectorDetails: "/sectores",
	ConsultorioDetails: "/sectores",
	ProfesionalDetails: "/profesional",
	Profile: "/perfil",
	MyLicencias: "/perfil/licencias",
	RequestLicencia: "/perfil/licencias/solicitar",
	RequestLicenciaConfirmation: "/perfil/licencias/solicitar/confirmacion",
	ChangePasswordConfirmation: "/perfil/cambiar-contrasena/confirmacion",
	Support: "/soporte",
	SupportConfirmation: "/soporte/confirmacion",
	// Admin
	Admin: "/admin",
	Reports: "/admin/reports",
	Licencias: "/admin/licencias",
	BlockAgenda: "/admin/bloquear-agenda",
	BlockAgendaConfirmation: "/admin/bloquear-agenda/confirmacion",
};
