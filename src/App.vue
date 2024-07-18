<template>
	<RouterView></RouterView>
</template>

<script>
export default {
	name: "App",
	mounted() {
		this.$primevue.config.ripple = true;
	},
};
</script>
