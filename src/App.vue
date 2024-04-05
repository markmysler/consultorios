<template>
	<HeaderComponent />
	<RouterView class="pt-6"></RouterView>
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

<style>
:root {
	--color-blue: #003794;
	--color-grey: #cacfe0;
	--color-light-blue: #b2d5ff;
}

* {
	font-family: "DM Sans", sans-serif;
}

body {
	max-width: 100%;
	place-items: normal;
	background: var(--color-blue);
	color: white;
	transition: none;
	padding: 0;
	margin: 0;
}
#app {
	width: 100%;
	max-width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0;
	padding: 0;
}

h1 {
	font-size: 2rem;
}

h2 {
	font-size: 1.7rem;
}

.columnAlignCenter {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.primaryButton {
	width: 90%;
	background: var(--color-light-blue);
	color: var(--color-blue);
	border-radius: 10px;
	padding: 1rem 0;
}
.primaryButton .p-button-label {
	font-weight: 700 !important;
	font-size: 1.3rem;
}

.p-inputtext,
.p-password-input,
.p-password {
	width: 100%;
}

.p-inputtext,
.p-password-input {
	background: none;
	border: 2px white solid;
	border-radius: 5px;
	padding: 1rem;
}

.p-float-label {
	width: 90%;
}

.p-float-label label {
	top: 35%;
	color: white;
	font-size: 1.2rem;
}

.p-float-label:has(input:focus) label {
	top: -2rem !important;
}
</style>
