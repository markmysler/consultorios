import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
import { db } from "@/firebase/init";
import { doc, getDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useAgendaStore } from "./agenda";
import { useLicenciaStore } from "./licencias";

export const useUserStore = defineStore("user", {
	state: () => {
		return {
			user: null,
			userData: null,
			userRole: null,
			userAgendas: null,
			userLicencias: null,
			loading: false,
			route_from: null,
			router: useRouter(),
		};
	},
	actions: {
		async getUserData(uid) {
			const userDoc = doc(db, "users", uid);
			const docSnap = await getDoc(userDoc);
			if (docSnap.exists()) {
				return docSnap.data();
			} else {
				return null;
			}
		},
		async preloadUserData(currentUser) {
			this.user = currentUser;
			if (
				currentUser &&
				!(
					this.userData &&
					this.userRole &&
					this.userAgendas &&
					this.userLicencias
				)
			) {
				this.loading = true;
				if (!this.userData || !this.userRole) {
					this.userData = await this.getUserData(currentUser.uid);
					this.userRole = this.userData.role;
				}
				let redirectPath;
				if (this.userData.confirmo_horarios) {
					redirectPath = this.route_from || ROUTES_NAMES.Search;
					this.route_from = null; // Clear the saved route after redirecting
				} else {
					redirectPath = ROUTES_NAMES.ConfirmSchedule;
				}

				this.router.push(redirectPath);

				if (this.userAgendas === null) {
					const agendaStore = useAgendaStore();
					this.userAgendas = await agendaStore.getAgendasUser(
						this.userData.cuil
					);
				}
				if (this.userLicencias === null) {
					const licenciasStore = useLicenciaStore();
					this.userLicencias = await licenciasStore.getLicenciasUser(
						this.userData.cuil
					);
					console.log(this.userLicencias);
				}
				this.loading = false;
			} else {
				this.loading = false;
			}
		},
	},
});
