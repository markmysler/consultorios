<template>
  <div class="header flex justify-content-space">
		<h1>Consultorios</h1>
    <Sidebar v-model:visible="visible" header="Sidebar">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </Sidebar>
    <Button icon="pi pi-arrow-right" @click="visible = true" />
  </div>
</template>

<script>
import Sidebar from 'primevue/sidebar';

export default {
	name: "HeaderComponent",
	components: {
		Sidebar,
	},
	data(){
		return{
			visible: false,
		}
	}
}
</script>

<style scoped>
.header{
	width: 100%;
	background-color: var(--color-grey);
}
</style>