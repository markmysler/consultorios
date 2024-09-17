<template>
  <main class="w-full">
    <h2>Soporte</h2>
    <FormSupportComponentVue :opcionesAsuntos="opcionesAsuntos" />
  </main>
</template>

<script>
import FormSupportComponentVue from '@/components/support/FormSupportComponent.vue';

export default {
  name: "SupportView",
  components: {
    FormSupportComponentVue,
  },
  data() {
    return {
      opcionesAsuntos: [
        "Opcion 1",
        "Opcion 2",
        "Opcion 3",
        "Opcion 4",
        "Opcion 5",
        "Otro",
      ],
    };
  },
};
</script>
