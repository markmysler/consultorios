<template>
	<div>
		<HeaderComponent />
		<router-view />
	</div>
</template>

<script>
import HeaderComponent from "@/components/layout/HeaderComponent.vue";
export default {
	name: "LayoutNoAuth",
	components: {
		HeaderComponent,
	},
};
</script>
