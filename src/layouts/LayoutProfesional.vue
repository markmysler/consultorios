<template>
	<div>
		<HeaderComponent />
		<router-view />
		<FooterProfesionalComponent />
	</div>
</template>

<script>
import HeaderComponent from "@/components/layout/HeaderComponent.vue";
import FooterProfesionalComponent from "@/components/layout/FooterProfesionalComponent.vue";
export default {
	name: "LayoutProfesional",
	components: {
		HeaderComponent,
		FooterProfesionalComponent,
	},
};
</script>
