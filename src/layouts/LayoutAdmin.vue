<template>
	<div>
		<HeaderComponent />
		<router-view />
		<FooterAdminComponent />
	</div>
</template>

<script>
import HeaderComponent from "@/components/layout/HeaderComponent.vue";
import FooterAdminComponent from "@/components/layout/FooterAdminComponent.vue";
export default {
	name: "LayoutAdmin",
	components: {
		HeaderComponent,
		FooterAdminComponent,
	},
};
</script>
