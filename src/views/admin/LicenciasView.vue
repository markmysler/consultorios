<template>
  <main class="w-full columnAlignCenter">
    <h2>Licencias</h2>
    <router-link :to="routes.AddLicencia" class="primaryButtonLink"
      >Agregar una licencia</router-link
    >
    <div class="w-full tabsLicencia">
      <TabView>
        <TabPanel header="Aprobadas">
          <div v-for="(licencia, index) in licenciasAprobadas" :key="index">
            <LicenciaCard
              @click="abrirDialog('detalle', licencia)"
              :licencia="licencia"
              :formatDate="formatDate"
              :aprobada="true"
            />
          </div>
          <!-- <Paginator
            :rows="5"
            :totalRecords="licenciasAprobadas.length"
            template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          ></Paginator> -->
        </TabPanel>
        <TabPanel header="Pendientes">
          <div v-for="(licencia, index) in licenciasPendientes" :key="index">
            <LicenciaCard
              :licencia="licencia"
              :formatDate="formatDate"
              :pendiente="true"
              @abrirDialog="handleDialog"
            />
          </div>
        </TabPanel>
        <TabPanel header="Rechazadas">
          <div v-for="(licencia, index) in licenciasRechazadas" :key="index">
            <LicenciaCard
              @click="abrirDialog('detalle', licencia)"
              :licencia="licencia"
              :formatDate="formatDate"
              :rechazada="true"
            />
          </div>
        </TabPanel>
      </TabView>
    </div>
  </main>
  <Dialog class="dialogLicencias w-11" v-model:visible="dialogVisible">
    <div class="column gap-2 p-2" v-if="licenciaSeleccionada">
      <template v-if="dialogType === 'detalle'">
        <h3 class="text-center mb-1">Detalle de la licencia</h3>
        <p>
          <span class="titleDialog">Profesional:</span>
          {{ licenciaSeleccionada.fullname }}
        </p>
        <p>
          <span class="titleDialog">Fecha de inicio:</span>
          {{ formatDate(licenciaSeleccionada.inicio) }}
        </p>
        <p>
          <span class="titleDialog">Fecha de fin:</span>
          {{ formatDate(licenciaSeleccionada.fin) }}
        </p>
        <p v-if="licenciaSeleccionada.tipo">
          <span class="titleDialog">Tipo de licencia:</span>
          {{ capitalize(licenciaSeleccionada.tipo) }}
        </p>
        <p
          v-if="
            licenciaSeleccionada.tipo &&
            licenciaSeleccionada.tipo === 'ordinaria'
          "
        >
          <span class="titleDialog">Año de la licencia:</span>
          {{ licenciaSeleccionada.anio }}
        </p>
        <div class="w-full rowSpaceBetween mt-2">
          <Button
            class="btnDialog btn-light-blue"
            @click="dialogVisible = false"
            >Cerrar</Button
          >
          <Button
            class="btnDialog primaryButton text-white"
            @click="abrirDialog('editar', licenciaSeleccionada)"
            >Editar</Button
          >
        </div>
      </template>

      <template v-else-if="dialogType === 'aprobar'">
        <p class="mb-1">¿Estas seguro que queres aprobar esta licencia?</p>
        <p>
          <span class="titleDialog">Profesional:</span>
          {{ licenciaSeleccionada.fullname }}
        </p>
        <p>
          <span class="titleDialog">Fecha de inicio:</span>
          {{ formatDate(licenciaSeleccionada.inicio) }}
        </p>
        <p>
          <span class="titleDialog">Fecha de fin:</span>
          {{ formatDate(licenciaSeleccionada.fin) }}
        </p>
        <p>
          <span class="titleDialog">Tipo de licencia:</span>
          {{ capitalize(licenciaSeleccionada.tipo) }}
        </p>
        <p v-if="licenciaSeleccionada.tipo === 'ordinaria'">
          <span class="titleDialog">Año de la licencia:</span>
          {{ licenciaSeleccionada.anio }}
        </p>
        <div class="w-full rowSpaceBetween mt-2">
          <Button
            class="btnDialog btn-light-blue"
            @click="dialogVisible = false"
            >Volver</Button
          >
          <Button
            class="btnDialog btn-green"
            @click="updateLicenciaState('aprobada')"
            >Aprobar</Button
          >
        </div>
      </template>

      <template v-else-if="dialogType === 'rechazar'">
        <p class="mb-1">¿Estas seguro que queres rechazar esta licencia?</p>
        <p>
          <span class="titleDialog">Profesional:</span>
          {{ licenciaSeleccionada.fullname }}
        </p>
        <p>
          <span class="titleDialog">Fecha de inicio:</span>
          {{ formatDate(licenciaSeleccionada.inicio) }}
        </p>
        <p>
          <span class="titleDialog">Fecha de fin:</span>
          {{ formatDate(licenciaSeleccionada.fin) }}
        </p>
        <p>
          <span class="titleDialog">Tipo de licencia:</span>
          {{ licenciaSeleccionada.tipo }}
        </p>
        <p v-if="licenciaSeleccionada.tipo === 'ordinaria'">
          <span class="titleDialog">Año de la licencia:</span>
          {{ licenciaSeleccionada.anio }}
        </p>
        <div class="w-full rowSpaceBetween mt-2">
          <Button
            class="btnDialog btn-light-blue"
            @click="dialogVisible = false"
            >Volver</Button
          >
          <Button
            class="btnDialog btn-red"
            @click="updateLicenciaState('rechazada')"
            >Rechazar</Button
          >
        </div>
      </template>

      <template v-else-if="dialogType === 'editar'">
        <h3 class="text-center mb-1">Editar licencia</h3>
        <div>
          <label for="fechaInicio">Edite la fecha de inicio</label>
          <Calendar
            v-model="licenciaSeleccionada.inicio"
            class="w-full"
            showIcon
            fluid
            iconDisplay="input"
            dateFormat="dd/mm/yy"
            id="fechaInicio"
            :disabled="!store.userData"
            :minDate="min_date_start"
            @change="validateFechaInicio"
          />
          <div class="error mt-1" v-if="validationErrors.fechaInicio">
            <span class="pi pi-exclamation-circle"></span>
            <p>{{ validationErrors.fechaInicio }}</p>
          </div>
        </div>
        <div>
          <label for="fechaFin">Edite la fecha de fin</label>
          <Calendar
            class="w-full"
            v-model="licenciaSeleccionada.fin"
            showIcon
            fluid
            iconDisplay="input"
            dateFormat="dd/mm/yy"
            id="fechaFin"
            :minDate="min_date_end"
            @change="validateFechaFin"
          />
          <div class="error mt-1" v-if="validationErrors.fechaFin">
            <span class="pi pi-exclamation-circle"></span>
            <p>{{ validationErrors.fechaFin }}</p>
          </div>
        </div>
        <div>
          <label for="tipoLicencia">Edite el tipo de la licencia</label>
          <Dropdown
            id="tipoLicencia"
            class="w-full dropDownNumero"
            v-model="licenciaSeleccionada.tipo"
            :options="tiposLicencia"
            @change="validarTipoLicencia"
          />
          <div class="error mt-1" v-if="validationErrors.tipoLicencia">
            <span class="pi pi-exclamation-circle"></span>
            <p>{{ validationErrors.tipoLicencia }}</p>
          </div>
        </div>
        <div v-if="licenciaSeleccionada.tipo === 'ordinaria'">
          <label for="anio">Edite el año de la licencia</label>
          <InputNumber
            id="anio"
            class="w-full"
            v-model="licenciaSeleccionada.anio"
            :useGrouping="false"
          />
          <div class="error mt-1" v-if="validationErrors.anio">
            <span class="pi pi-exclamation-circle"></span>
            <p>{{ validationErrors.anio }}</p>
          </div>
        </div>
        <div>
          <label for="estado">Edite el estado de la licencia</label>
          <Dropdown
            id="estado"
            class="w-full dropDownNumero"
            v-model="licenciaSeleccionada.estado"
            :options="estadosLicencia"
          />
        </div>
        <div class="w-full rowSpaceBetween mt-2">
          <Button
            class="btnDialog btn-light-blue"
            @click="dialogVisible = false"
            >Cancelar</Button
          >
          <Button class="btnDialog btn-green">Confirmar</Button>
        </div>
      </template>
    </div>
  </Dialog>
</template>

<script>
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
import { useUserStore } from "@/stores/user";
import { capitalize } from "vue";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/init";
import { useLicenciaStore } from "@/stores/licencias";
import { useProfesionalStore } from "@/stores/profesional";

import LicenciaCard from "@/components/admin/LicenciaCard.vue";

export default {
  name: "MyLicenciasView",
  components: {
    LicenciaCard,
  },
  data() {
    return {
      routes: ROUTES_NAMES,
      store: useUserStore(),
      licenciaStore: useLicenciaStore(),
      profStore: useProfesionalStore(),
      licencias: null,
      dialogVisible: false,
      dialogType: "",
      licenciaSeleccionada: null,
      min_date_start: null,
      min_date_end: null,
      validationErrors: {
        fechaInicio: null,
        fechaFin: null,
        tipoLicencia: null,
        anio: null,
        imagen: null,
      },
      tiposLicencia: ["Estrés", "ordinaria", "Salubridad"],
      estadosLicencia: ["Aprobada", "Pendiente", "Rechazada"],
    };
  },
  methods: {
    async updateLicenciaState(new_state) {
      const ref = doc(db, "licencias", this.licenciaSeleccionada.id);
      await updateDoc(ref, { estado: new_state })
        .then((res) => {
          const index = this.licencias.findIndex(
            (lic) => lic.id === this.licenciaSeleccionada.id
          );
          this.licencias[index].estado = new_state;
          if (new_state === "aprobada") {
            this.dialogAprobar = false;
          } else if (new_state === "rechazada") {
            this.dialogRechazar = false;
          }
          this.licenciaSeleccionada = null;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    formatDate(dateString) {
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
      return new Date(dateString).toLocaleDateString("es-ES", options);
    },
    async getProfessionalFullName(cuil) {
      const prof = await this.profStore.getProfesional(cuil);

      return `${prof.nombre} ${prof.apellido}`;
    },
    handleDialog(action, licencia) {
      this.abrirDialog(action, licencia);
    },
    abrirDialog(tipo, licencia) {
      this.dialogType = tipo;
      this.dialogVisible = true;
      this.licenciaSeleccionada = licencia;
    },
    capitalize,
    validateFechaInicio() {
      if (!this.licenciaSeleccionada.fechaInicio) {
        this.validationErrors.fechaInicio =
          "Debe seleccionar una fecha de inicio.";
      } else {
        this.validationErrors.fechaInicio = null;
      }
    },
    validateFechaFin() {
      if (!this.licenciaSolicitada.fechaFin) {
        this.validationErrors.fechaFin = "Debe seleccionar una fecha de fin.";
      } else if (
        new Date(this.licenciaSolicitada.fechaFin) <=
        new Date(this.licenciaSolicitada.fechaInicio)
      ) {
        this.validationErrors.fechaFin =
          "La fecha de fin debe ser posterior a la fecha de inicio.";
      } else {
        this.validationErrors.fechaFin = null;
      }
    },
    validarFechas() {
      this.validateFechaInicio();
      this.validateFechaFin();
    },
    validarTipoLicencia() {
      if (!this.licenciaSolicitada.tipoLicencia) {
        this.validationErrors.tipoLicencia = "Debes elegir un tipo de licencia";
      } else if (this.licenciaSolicitada.tipoLicencia === "Ordinaria") {
        if (!this.licenciaSolicitada.anio) {
          this.validationErrors.anio = "Debes escribir un año de la licencia";
        } else if (
          this.licenciaSolicitada.anio <= 1900 ||
          this.licenciaSolicitada.anio > new Date().getFullYear()
        ) {
          this.validationErrors.anio = "Ingrese un año válido";
        }
      }
    },
  },
  async mounted() {
    try {
      const res = await this.licenciaStore.getMostRecentLicencias();
      this.licencias = await Promise.all(
        res.map(async (lic) => {
          const fullname = await this.getProfessionalFullName(lic.cuil);
          return { ...lic, fullname };
        })
      );
    } catch (err) {
      console.log(err);
    }
    this.min_date_start = new Date();
    this.min_date_start.setDate(
      this.min_date_start.getDate() + this.store.userData.anticipacion_licencia
    );
    this.min_date_end = new Date();
    this.min_date_end.setDate(
      this.min_date_end.getDate() +
        this.store.userData.anticipacion_licencia +
        1
    );
  },
  computed: {
    licenciasAprobadas() {
      if (this.licencias === null) return [];
      return this.licencias.filter(
        (licencia) => licencia.estado === "aprobada"
      );
    },
    licenciasPendientes() {
      if (this.licencias === null) return [];
      return this.licencias.filter(
        (licencia) => licencia.estado === "pendiente"
      );
    },
    licenciasRechazadas() {
      if (this.licencias === null) return [];
      return this.licencias.filter(
        (licencia) => licencia.estado === "rechazada"
      );
    },
  },
};
</script>

<style>
.tabsLicencia .p-tabview {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.tabsLicencia .p-tabview .p-tabview-nav li .p-tabview-nav-link {
  padding: 0.313rem 0.625rem;
}

.tabsLicencia .p-tabview-title {
  font-size: 0.875rem;
  font-weight: 400;
}

.tabsLicencia
  .p-tabview
  .p-tabview-nav
  li.p-highlight
  .p-tabview-nav-link
  .p-tabview-title {
  font-weight: 700;
}

.tabsLicencia .p-tabview-panel {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.dialogLicencias .p-dialog-header {
  justify-content: flex-end;
  border-radius: 0.625rem 0.625rem 0 0;
}
.dialogLicencias .p-dialog-content {
  border-radius: 0 0 0.625rem 0.625rem;
}

.dialogLicencias .p-inputtext,
.dialogLicencias .p-dropdown {
  background-color: white;
}

.dialogLicencias .p-input-icon {
  top: 27.5%;
  right: 0.625rem;
}

.dialogLicencias .p-calendar .p-datepicker-trigger-icon {
  font-size: 1rem;
  position: absolute;
  top: 27.5%;
  left: 0.688rem;
  color: var(--color-blue);
}

.dialogLicencias .p-inputtext {
  padding-left: 2.188rem;
}

.dialogLicencias .p-inputnumber-input,
.dialogLicencias .p-dropdown-label {
  color: #000f27;
  padding-left: 1rem;
}

.dialogLicencias .p-dropdown .p-inputtext {
  border-radius: 5px;
}

label {
  font-weight: 500;
}
</style>

<style scoped>
main {
  gap: 1.25rem;
}

.dialogLicencias {
  border-radius: 0.625rem;
}

.dialogLicencias div p:first-of-type {
  font-size: 0.875rem;
  line-height: 18.23px;
}

.dialogLicencias p,
.dialogDetalle p {
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
