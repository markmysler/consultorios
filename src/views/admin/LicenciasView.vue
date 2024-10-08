<template>
  <main class="w-full">
    <h2>Licencias</h2>
    <router-link :to="routes.AddLicencia" class="primaryButtonLink mt-3">Agregar una licencia</router-link>
    <div class="w-full column gap-3 mt-3">
      <!-- Licencias aprobadas -->
      <div class="column gap-2">
        <p class="titleLicencia">Licencias aprobadas</p>
        <div
          v-for="(aprobada, index) in licenciasAprobadas"
          :key="index"
          class="w-full licenciaCard rowCenter border-round-md">
          <div class="nombre bg-light-blue py-2 px-3">
            <p class="text-blue text-center font-bold">
              {{ getProfessionalFullName(aprobada.cuil) }}
            </p>
          </div>
          <div class="fecha bg-dark-gray p-2">
            <p class="text-blue text-center font-bold">
              {{ formatDate(aprobada.inicio) }} - {{ formatDate(aprobada.fin) }}
            </p>
          </div>
        </div>
      </div>
      <!-- Licencias pendientes -->
      <div class="column gap-2">
        <p class="titleLicencia">Licencias pendientes</p>
        <div
          class="column gap-3"
          v-for="(pendiente, index) in licenciasPendientes"
          :key="index">
          <div class="w-full licenciaCard rowCenter border-round-md">
            <div class="nombre bg-light-blue py-2 px-3">
              <p class="text-blue text-center font-bold">
                {{ getProfessionalFullName(pendiente.cuil) }}
              </p>
            </div>
            <div class="fecha bg-dark-gray p-2">
              <p class="text-blue text-center font-bold">
                {{ formatDate(pendiente.inicio) }} -
                {{ formatDate(pendiente.fin) }}
              </p>
            </div>
          </div>
          <div class="justifyCenter gap-2">
            <Button
              class="btnPendiente btn-red py-1 px-3"
              @click="abrirDialogRechazar(pendiente)"
              >Rechazar</Button
            >
            <Button
              class="btnPendiente btn-green py-1 px-3"
              @click="abrirDialogAprobar(pendiente)"
              >Aprobar</Button
            >
          </div>
        </div>
      </div>
      <!-- Licencias rechazadas -->
      <div class="column gap-2">
        <p class="titleLicencia">Licencias rechazadas</p>
        <div
          v-for="(rechazada, index) in licenciasRechazadas"
          :key="index"
          class="w-full licenciaCard rowCenter border-round-md">
          <div class="nombre bg-light-blue p-2">
            <p class="text-blue text-center font-bold">
              {{ getProfessionalFullName(rechazada.cuil) }}
            </p>
          </div>
          <div class="fecha bg-dark-gray py-2 px-3">
            <p class="text-blue text-center font-bold">
              {{ formatDate(rechazada.inicio) }} -
              {{ formatDate(rechazada.fin) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
  <Dialog class="dialogLicencias w-11" v-model:visible="dialogRechazar">
    <div class="column gap-2 p-2" v-if="licenciaSeleccionada">
      <p class="mb-1">¿Estas seguro que queres rechazar esta licencia?</p>
      <p>
        <span class="titleDialog">Profesional:</span> {{ getProfessionalFullName(licenciaSeleccionada.cuil) }}
      </p>
      <p><span class="titleDialog">Fecha de inicio:</span> {{ formatDate(licenciaSeleccionada.inicio) }}</p>
      <p><span class="titleDialog">Fecha de fin:</span> {{ formatDate(licenciaSeleccionada.fin) }}</p>
      <div class="w-full rowSpaceBetween mt-2">
        <Button class="btnDialog btn-light-blue" @click="dialogRechazar = false"
          >Volver</Button
        >
        <Button class="btnDialog btn-red">Rechazar</Button>
      </div>
    </div>
  </Dialog>
	<Dialog class="dialogLicencias w-11" v-model:visible="dialogAprobar">
    <div class="column gap-2 p-2" v-if="licenciaSeleccionada">
      <p class="mb-1">¿Estas seguro que queres aprobar esta licencia?</p>
      <p>
        <span class="titleDialog">Profesional:</span> {{ getProfessionalFullName(licenciaSeleccionada.cuil) }}
      </p>
      <p><span class="titleDialog">Fecha de inicio:</span> {{ formatDate(licenciaSeleccionada.inicio) }}</p>
      <p><span class="titleDialog">Fecha de fin:</span> {{ formatDate(licenciaSeleccionada.fin) }}</p>
      <div class="w-full rowSpaceBetween mt-2">
        <Button class="btnDialog btn-light-blue" @click="dialogAprobar = false"
          >Volver</Button
        >
        <Button class="btnDialog btn-green">Aprobar</Button>
      </div>
    </div>
  </Dialog>
</template>

<script>
  import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
  import { licencias } from "@/constants/models";
  import { profesionales } from "@/constants/models";

  export default {
    name: "MyLicenciasView",
    data() {
      return {
        routes: ROUTES_NAMES,
        dialogRechazar: false,
        dialogAprobar: false,
        licenciaSeleccionada: null,
        licenciasAprobadas: licencias.filter(
          (licencia) => licencia.estado === "aprobada"
        ),
        licenciasPendientes: licencias.filter(
          (licencia) => licencia.estado === "pendiente"
        ),
        licenciasRechazadas: licencias.filter(
          (licencia) => licencia.estado === "rechazada"
        ),
      };
    },
    methods: {
      formatDate(dateString) {
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        return new Date(dateString).toLocaleDateString("es-ES", options);
      },
      getProfessionalFullName(cuil) {
        const prof = profesionales.find((prof) => prof.cuil === cuil);
        return `${prof.nombre} ${prof.apellido}`;
      },
      abrirDialogAprobar(licencia) {
        this.licenciaSeleccionada = licencia;
        this.dialogAprobar = true;
      },
      abrirDialogRechazar(licencia) {
        this.licenciaSeleccionada = licencia;
        this.dialogRechazar = true;
      },
    },
  };
</script>

<style>
  .dialogLicencias .p-dialog-header {
    justify-content: flex-end;
    border-radius: 0.625rem 0.625rem 0 0;
  }
  .dialogLicencias .p-dialog-content {
    border-radius: 0 0 0.625rem 0.625rem;
  }
</style>

<style scoped>
  .titleLicencia {
    font-weight: 700;
  }

  .licenciaCard {
    box-shadow: 0px 4px 4px 0px #00000040;
    font-size: 0.75rem;
  }

  .nombre {
    width: 36%;
    border-top-left-radius: 0.313rem;
    border-bottom-left-radius: 0.313rem;
  }

  .fecha {
    width: 65%;
    border-top-right-radius: 0.313rem;
    border-bottom-right-radius: 0.313rem;
  }

  .btnPendiente {
    border-radius: 15px;
    border: none;
    font-size: 0.625rem;
    font-weight: 500;
    color: black;
    line-height: 13.02px;
  }

  .dialogLicencias {
    border-radius: 0.625rem;
  }

	.dialogLicencias div p:first-of-type {
		font-size: 0.875rem;
		line-height: 18.23px;
	}

	.dialogLicencias p {
		font-size: 0.75rem;
		line-height: 15.62px;
	}

	.titleDialog {
		font-weight: 600;
	}

  .btnDialog {
		width: 48%;
		height: 2.5rem;
		display: flex;
		justify-content: center;
    border-radius: 0.625rem;
    border: none;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    color: rgba(0, 55, 148, 1);
    font-weight: 700;
    font-size: 0.875rem;
    line-height: 20.83px;
    padding: 0 0.875rem;
  }

  .btn-red {
    background-color: rgba(222, 94, 94, 1);
  }

  .btn-green {
    background-color: rgba(141, 222, 94, 1);
  }

  .btn-light-blue {
    background-color: rgba(178, 213, 255, 1);
  }
</style>
