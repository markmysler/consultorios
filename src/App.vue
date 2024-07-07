<template>
	<HeaderComponent />
	<RouterView class="pt-5"></RouterView>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import HeaderComponent from "@/components/HeaderComponent.vue";
export default {
	name: "App",
	components: {
		HeaderComponent,
	},
	mounted() {
		this.$primevue.config.ripple = true;
	},
};
</script>
<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import { useHeaderStore } from "./stores/header";
const headerStore = useHeaderStore();
const route = useRoute();

watch(route, (to, from) => {
	if (headerStore.visible) {
		headerStore.visible = false;
	}
});
</script>