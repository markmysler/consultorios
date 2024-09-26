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
		onAuthStateChanged(auth, async (currentUser) => {
			store.preloadUserData(currentUser);
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
