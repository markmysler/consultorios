<template>
  <main class="w-full">
    <h2>
      {{ rebusqueda.tipo === "profesional" ? "Profesional" : "Consultorio" }}
    </h2>
    <section class="w-full formRebusqueda pb-4 mt-4">
      <form class="column gap-2" v-if="rebusqueda.tipo === 'profesional'">
        <IconField class="searchInput">
          <InputIcon class="text-blue pi pi-search" />
          <InputText
            placeholder="Nombre, Apellido, CUIL"
            class="i"
            v-model="rebusqueda.input"
          />
        </IconField>
        <div class="rowCenter gap-2">
          <Dropdown
            class="w-6"
            v-model="rebusqueda.especialidad"
            placeholder="Especialidad"
            :options="especialidades"
          />
          <Dropdown
            class="w-6"
            v-model="rebusqueda.turno"
            placeholder="Disponibilidad"
            :options="turnos"
            showClear
          />
        </div>
        <div class="calendars rowCenter gap-2">
          <Calendar
            v-model="rebusqueda.fecha"
            showIcon
            fluid
            iconDisplay="input"
            dateFormat="dd/mm/yy"
            id="date"
          />
          <Calendar
            v-model="rebusqueda.horario"
            showIcon
            fluid
            timeOnly
            iconDisplay="input"
            id="time"
          >
            <template #inputicon="slotProps">
              <i class="pi pi-clock" @click="slotProps.clickCallback" />
            </template>
          </Calendar>
        </div>
      </form>
      <form class="column gap-2" v-if="rebusqueda.tipo === 'consultorio'">
        <IconField class="searchInput">
          <InputIcon class="text-blue pi pi-search" />
          <InputText
            placeholder="Nombre de Agenda"
            class="i"
            v-model="rebusqueda.input"
          />
        </IconField>
        <div class="rowCenter gap-2">
          <Dropdown
            class="w-6"
            v-model="rebusqueda.sector"
            placeholder="Sector"
            :options="Object.keys(sectors)"
          />
          <Dropdown
            class="w-6"
            v-model="rebusqueda.numero"
            placeholder="Número"
            :options="consultorios[sectors[rebusqueda.sector]]"
          />
        </div>
        <div class="rowCenter gap-2">
          <Dropdown
            class="w-6"
            v-model="rebusqueda.especialidad"
            placeholder="Especialidad"
            :options="especialidades"
          />
          <Dropdown
            class="w-6"
            v-model="rebusqueda.disponibilidad"
            placeholder="Disponibilidad"
            :options="disponibilidad"
            showClear
          />
        </div>
        <div class="calendars rowCenter gap-2">
          <Calendar
            v-model="rebusqueda.fecha"
            showIcon
            fluid
            iconDisplay="input"
            dateFormat="dd/mm/yy"
            id="date"
          />
          <Calendar
            v-model="rebusqueda.horario"
            showIcon
            fluid
            timeOnly
            iconDisplay="input"
            id="time"
          >
            <template #inputicon="slotProps">
              <i class="pi pi-clock" @click="slotProps.clickCallback" />
            </template>
          </Calendar>
        </div>
      </form>
    </section>
    <section class="w-full resultsContainer column pt-4">
      <router-link
        v-if="
          rebusqueda.tipo === 'profesional' && rebusqueda.resultados === true
        "
        v-for="(resultado, index) in resultadosProfesionales"
        :key="index"
        class="w-full resultado rowCenter border-round-md no-underline"
        :to="routes.ProfesionalDetails + '1'"
      >
        <div class="w-5 bg-light-blue border-round-left-md py-2 px-3">
          <p class="text-blue font-bold">{{ resultado.especialidad }}</p>
        </div>
        <div class="w-8 bg-dark-gray border-round-right-md py-2 px-3">
          <p class="text-blue font-bold">
            {{ resultado.nombre }} {{ resultado.apellido }}
          </p>
        </div>
      </router-link>
      <router-link
        v-if="
          rebusqueda.tipo === 'consultorio' && rebusqueda.resultados === true
        "
        v-for="(resultado, index) in resultadosConsultorios"
        :key="index"
        class="w-full resultado rowCenter border-round-md no-underline"
        :to="
          routes.ConsultorioDetails +
          '/' +
          resultado.sector +
          '/' +
          resultado.numero
        "
      >
        <div class="w-5 bg-light-blue border-round-left-md py-2 px-3">
          <p class="text-blue font-bold">{{ resultado.sector }}</p>
        </div>
        <div class="w-8 bg-dark-gray border-round-right-md py-2 px-3">
          <p class="text-blue font-bold">Consultorio {{ resultado.numero }}</p>
        </div>
      </router-link>
      <div v-if="rebusqueda.resultados === false">
        <div class="noResultados bg-red border-round-md px-3 py-2">
          <p class="text-center text-white">No hay resultados para tu búsqueda.</p>
          <p class="text-center text-white">Pruebe de nuevo con otros filtros.</p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { sectorSearch } from "@/constants/sectorsMap.js";
import { consultorios } from "@/constants/models";
import { especialidades } from "@/constants/especialidades";
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";

export default {
  name: "SearchResultsView",
  data() {
    return {
      routes: ROUTES_NAMES,
      consultorios: consultorios,
      sectors: sectorSearch,
      especialidades: especialidades,
      disponibilidad: ["Ocupado", "Libre"],
      turnos: ["Matutino", "Vespertino", "Todos"],
      // rebusqueda: {
      //   tipo: "profesional",
      //   input: "Juan",
      //   especialidad: "Pediatría",
      //   turno: "Matutino",
      //   fecha: new Date(),
      //   horario: new Date(),
      //   resultados: false,
      // },
      // rebusqueda: {
      //   tipo: "profesional",
      //   input: "Juan",
      //   especialidad: "Pediatría",
      //   turno: "Matutino",
      //   fecha: new Date(),
      //   horario: new Date(),
      //   resultados: true,
      // },
      rebusqueda: {
        tipo: "consultorio",
        input: "Consulta",
        sector: "A",
        numero: "1",
        especialidad: "Pediatría",
        disponibilidad: "Ocupado",
        fecha: new Date(),
        horario: new Date(),
        resultados: true,
      },
      resultadosConsultorios: [
        {
          sector: "Sector A",
          numero: "1",
        },
        {
          sector: "Inflectología",
          numero: "14",
        },
        {
          sector: "Oncología",
          numero: "23",
        },
      ],
      resultadosProfesionales: [
        {
          especialidad: "Pediatría",
          nombre: "Juan",
          apellido: "Gimenez",
        },
        {
          especialidad: "Pediatría",
          nombre: "Juan",
          apellido: "Perez",
        },
        {
          especialidad: "Pediatría",
          nombre: "Juan",
          apellido: "Alvarez",
        },
      ],
    };
  },
};
</script>

<style>
.calendars .p-calendar .p-inputtext {
  padding-left: 2.25rem;
}

.calendars .p-calendar .p-datepicker-trigger-icon,
.calendars .pi-clock {
  font-size: 1rem;
  position: absolute;
  top: 27.5%;
  left: 0.688rem;
  color: var(--color-blue);
}
</style>

<style scoped>
.formRebusqueda {
  border-bottom: 1px solid #777777;
}

.resultsContainer {
  gap: 0.75rem;
}

.resultado {
  box-shadow: 0px 4px 4px 0px #00000040;
}

.resultado p,
.noResultados p {
  font-size: 0.75rem;
}
</style>
