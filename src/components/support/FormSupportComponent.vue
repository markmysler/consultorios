<template>
	<form class="formSupport column gap-4 mt-3">
		<div class="column gap-2">
			<label for="asunto"
				>Elige una opción que englobe tu problema
			</label>
			<Dropdown
				class="w-full"
				id="asunto"
				name="asunto"
				v-model="mailSoporte.asunto"
				placeholder="Elige una opción"
				:options="opcionesAsuntos"
				filter
			/>
			<div class="error" v-if="errors.asunto">
				<span class="pi pi-exclamation-circle"></span>
				<p class="text-red">{{ errors.asunto }}</p>
			</div>
		</div>
		<div class="column gap-2">
			<label for="description">Cuéntanos más sobre tu problema</label>
			<Textarea
				class="w-full h-8rem"
				v-model="mailSoporte.descripcion"
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
		opcionesAsuntos: {
			type: Object,
			required: false,
		},
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
			mailSoporte: {
				asunto: "",
				descripcion: "",
			},
			errors: {
				asunto: null,
				descripcion: null,
			},
		};
	},
	methods: {
		enviarSoporte() {
			this.errors = {};

			if (!this.mailSoporte.asunto) {
				this.errors.asunto = "Debes elegir una opción";
			}

			if (!this.mailSoporte.descripcion) {
				this.errors.descripcion = "Debes escribir sobre tu problema";
			} else if (this.mailSoporte.descripcion.length < 5) {
				this.errors.descripcion = "El texto ingresado es muy corto";
			}

			if (Object.keys(this.errors).length === 0) {
				this.sendSupportEmail(
					this.mailSoporte.asunto,
					this.mailSoporte.descripcion
				);
				this.mailSoporte.asunto = "";
				this.mailSoporte.descripcion = "";
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
