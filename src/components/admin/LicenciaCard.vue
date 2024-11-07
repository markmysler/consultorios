<template>
  <div class="licenciaContainer column">
    <div @click="$emit('abrirDialog', 'detalle', licencia)" class="w-full licenciaCard bg-dark-gray border-round-md">
      <div class="rowCenter">
        <div class="nombre bg-light-blue py-2 px-3">
          <p class="text-blue text-center font-bold">
            {{ licencia.fullname }}
          </p>
        </div>
        <div class="fecha p-2">
          <p class="text-blue text-center font-bold">
            {{ formatDate(licencia.inicio) }} -
            {{ formatDate(licencia.fin) }}
          </p>
        </div>
      </div>
      <div class="estado" v-if="aprobada">
        <p class="text-blue">Aprobada por:</p>
      </div>
      <div class="estado" v-if="rechazada">
        <p class="text-blue">Rechazada por:</p>
      </div>
    </div>
    <div v-if="pendiente" class="justifyCenter gap-2">
      <Button
        class="btnPendiente btn-red py-1 px-3"
        @click.stop="$emit('abrirDialog', 'rechazar', licencia)"
        >Rechazar</Button
      >
      <Button
        class="btnPendiente btn-green py-1 px-3"
        @click.stop="$emit('abrirDialog', 'aprobar', licencia)"
        >Aprobar</Button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    licencia: Object,
    pendiente: Boolean,
    aprobada: Boolean,
    rechazada: Boolean,
    formatDate: Function,
  },
};
</script>

<style scoped>
.licenciaContainer {
  gap: 0.625rem;
}

.titleLicencia {
  font-weight: 700;
}

.licenciaCard {
  box-shadow: 0px 4px 4px 0px #00000040;
  font-size: 0.75rem;
  cursor: pointer;
}

.nombre {
  width: 36%;
  border-top-left-radius: 0.313rem;
  border-bottom-right-radius: 0.313rem;
}

.fecha {
  width: 65%;
  border-top-right-radius: 0.313rem;
  border-bottom-right-radius: 0.313rem;
}

.estado {
  padding: 0.438rem 0.875rem;
}

.btnPendiente {
  border-radius: 15px;
  border: none;
  font-size: 0.625rem;
  font-weight: 500;
  color: black;
  line-height: 13.02px;
}

.btn-red {
  background-color: rgba(222, 94, 94, 1);
}

.btn-green {
  background-color: rgba(141, 222, 94, 1);
}
</style>
