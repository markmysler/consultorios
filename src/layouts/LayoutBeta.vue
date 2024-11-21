<template>
	<div class="w-full layout">
		<HeaderComponent />
		<router-view />
	</div>
</template>

<script>
import HeaderComponent from "@/components/layout/HeaderComponent.vue";
import { useUserStore } from "@/stores/user";

export default {
	name: "LayoutAuth",
	components: {
		HeaderComponent,
	},
	data() {
		return {
			store: useUserStore(),
		};
	},
};
</script>
