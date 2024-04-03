<template>
  <HeaderComponent />
  <h1>App</h1>
  <RouterView></RouterView>
</template>

<script>
  import { RouterLink, RouterView } from "vue-router";
  import HeaderComponent from "@/components/HeaderComponent.vue";
  export default {
    name: "App",
    components: {
      HeaderComponent,
    },
  };
</script>

<style>
	:root{
		--color-blue: #003794;
		--color-grey: #CACFE0;
	}

  body {
    max-width: 100%;
		place-items: normal;
		background: var(--color-blue);
		color: var(--color-blue);
		font-family: "DM Sans", sans-serif;
		transition: none;
    padding: 0;
    margin: 0;
  }
  #app {
		width: 100%;
		max-width: 100%;
    display: flex;
    flex-direction: column;
		margin: 0;
		padding: 0;
  }
</style>
