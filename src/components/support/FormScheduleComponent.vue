<template>
  <form class="formSupport column gap-4 mt-3">
    <div class="column gap-2">
      <label for="description">Cuéntanos más sobre tu problema</label>
      <Textarea
        class="w-full h-8rem"
        v-model="descripcion"
        placeholder="Escribe aquí..."
        :style="{ resize: 'none' }"
      />
      <div class="error" v-if="errors.descripcion">
        <span class="pi pi-exclamation-circle"></span>
        <p class="text-red">{{ errors.descripcion }}</p>
      </div>
    </div>
    <Button
      class="primaryButton"
      label="Enviar"
      @click.prevent="enviarSoporte"
    ></Button>
  </form>
</template>

<script>
export default {
  props: {
    sendSupportEmail: {
      type: Function,
      required: true,
    },
    asunto: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      descripcion: "",
      errors: {
        descripcion: null,
      },
    };
  },
  methods: {
    enviarSoporte() {
      this.errors = {};

      if (!this.descripcion) {
        this.errors.descripcion = "Debes escribir sobre tu problema";
      } else if (this.descripcion.length < 5) {
        this.errors.descripcion = "El texto ingresado es muy corto";
      }

      if (Object.keys(this.errors).length === 0) {
        this.sendSupportEmail(
          this.asunto,
          this.descripcion
        );
        this.descripcion = "";
      }
      
    },
  },
};
</script>

<style>
.formSupport .p-inputtext {
  background: transparent;
}

.formSupport .p-dropdown {
  background-color: transparent;
}
</style>

<style scoped>
label {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 18.23px;
}

.error span {
  font-size: 0.75rem;
}
</style>
