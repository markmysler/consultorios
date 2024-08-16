<template>
  <main>
    <h2>Juan Perez</h2>
    <div class="especialidades"></div>
  </main>
</template>

<script>
import { profesionales } from "@/constants/models.js";

export default {
  name: "ProfesionalDetailsView",
	data() {
		return {
			ejemplo: profesionales[0]
		}
	}
};
</script>
