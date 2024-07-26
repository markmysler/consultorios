<template>
	<RouterView></RouterView>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "./stores/user";
import { useRouter } from "vue-router";
import { ROUTES_NAMES } from "./constants/ROUTES_NAMES";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase/init";

export default {
	name: "App",
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
				if (!store.userData || !store.userRole) {
					const userDoc = doc(db, "users", currentUser.uid);
					const docSnap = await getDoc(userDoc);
					if (docSnap.exists()) {
						store.userData = docSnap.data();
						store.userRole = store.userData.role;
					}
				}
				router.push(ROUTES_NAMES.Search);
			}
		});
	},
};
</script>
