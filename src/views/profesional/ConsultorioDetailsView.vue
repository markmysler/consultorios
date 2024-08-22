<template>
  <main>
    <h2>Consultorio detalles</h2>
  </main>
	<div>
		<p v-if="agendasConsultorio">{{agendasConsultorio[0]}}</p>
	</div>
</template>

<script>
  import { agendas } from "@/constants/models.js";
	import { useRoute } from "vue-router";

  export default {
    name: "ConsultorioDetailsView",
    data() {
      return {
				route: useRoute(),
        agendasConsultorio: null,
      };
    },
    methods: {
      getAgendasFiltradas() {
				console.log(this.sectorId);
				console.log(this.consultorioId);
        return agendas.filter(
          (agenda) =>
            agenda.consultorio.sector === this.sectorId &&
            agenda.consultorio.nombre === this.consultorioId
        );
      },
    },
		onMounted() {
			this.agendasConsultorio = this.getAgendasFiltradas()
		},
    computed: {
      sectorId() {
        return this.route.params.sector_id;
      },
      consultorioId() {
        return this.route.params.consultorio_id;
      },
    },
  };
</script>
