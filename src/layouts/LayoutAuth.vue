<template>
	<div class="w-full h-screen columnSpaceBetweenCenter">
		<HeaderComponent />
		<router-view />
		<FooterAdminComponent v-if="store.userRole === 'admin'" />
		<FooterProfesionalComponent
			v-else-if="store.userRole === 'profesional'"
		/>
	</div>
</template>

<script>
import HeaderComponent from "@/components/layout/HeaderComponent.vue";
import FooterAdminComponent from "@/components/layout/FooterAdminComponent.vue";
import FooterProfesionalComponent from "@/components/layout/FooterProfesionalComponent.vue";
import { useUserStore } from "@/stores/user";

export default {
	name: "LayoutAuth",
	components: {
		HeaderComponent,
		FooterAdminComponent,
		FooterProfesionalComponent,
	},
	data() {
		return {
			store: useUserStore(),
		};
	},
};
</script>
