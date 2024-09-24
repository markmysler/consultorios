<template>
	<Toast />
	<template v-if="store && !store.loading">
		<RouterView></RouterView>
	</template>
	<template v-if="store && store.loading">
		<div class="h-screen columnCenter">
			<ProgressSpinner
				style="width: 50px; height: 50px"
				strokeWidth="8"
				stroke="blue"
				fill="transparent"
				animationDuration="2s"
				aria-label="Loading"
			/>
		</div>
	</template>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "./stores/user";
import { useRouter } from "vue-router";
import { ROUTES_NAMES } from "./constants/ROUTES_NAMES";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { db } from "./firebase/init";

export default {
	name: "App",
	data() {
		return {
			store: useUserStore(),
		};
	},
	mounted() {
		this.$primevue.config.ripple = true;
	},
	setup() {
		const auth = getAuth();
		const store = useUserStore();
		const router = useRouter();
		onAuthStateChanged(auth, async (currentUser) => {
			store.user = currentUser;
			if (currentUser) {
				store.loading = true;
				if (!store.userData || !store.userRole) {
					const userDoc = doc(db, "users", currentUser.uid);
					const docSnap = await getDoc(userDoc);
					if (docSnap.exists()) {
						store.userData = docSnap.data();
						store.userRole = store.userData.role;
					}
				}

				store.loading = false;
				let redirectPath;
				if (store.userData.confirmo_horarios) {
					redirectPath = store.route_from || ROUTES_NAMES.Search;
					store.route_from = null; // Clear the saved route after redirecting
				} else {
					redirectPath = ROUTES_NAMES.ConfirmSchedule;
				}

				router.push(redirectPath);

				if (store.userAgendas === null) {
					const col = collection(db, "agendas");
					const q = query(
						col,
						where("cuil", "==", store.userData.cuil)
					);
					const querySnapshot = await getDocs(q);

					if (!querySnapshot.empty) {
						store.userAgendas = querySnapshot.docs.map((doc) =>
							doc.data()
						);
					} else {
						store.userAgendas = [];
					}
				}
				if (store.userLicencias === null) {
					const col = collection(db, "licencias");
					const q = query(
						col,
						where("cuil", "==", store.userData.cuil)
					);
					const querySnapshot = await getDocs(q);

					if (!querySnapshot.empty) {
						store.userLicencias = querySnapshot.docs.map((doc) =>
							doc.data()
						);
					} else {
						store.userLicencias = [];
					}
				}
			} else {
				store.loading = false;
			}
		});
	},
};
</script>

<style>
@keyframes p-progress-spinner-color {
	100%,
	0% {
		stroke: var(--color-blue);
	}
	20% {
		stroke: var(--color-light-blue);
	}
	40% {
		stroke: var(--color-blue);
	}
	60% {
		stroke: var(--color-light-blue);
	}
	80% {
		stroke: var(--color-blue);
	}
}
</style>
