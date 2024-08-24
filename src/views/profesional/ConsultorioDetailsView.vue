<template>
  <main class="w-full">
    <Breadcrumb class="breadcrumb" :model="items" />
    <h2 class="mt-3">Consultorio {{ consultorioId }}</h2>
    <p>Sector {{ sectorId }}</p>
    <div class="fechaConsultorio my-4">
      <label for="date">Seleccione una fecha</label>
      <Calendar
        class="w-full"
        v-model="consultorioDate"
        showIcon
        fluid
        iconDisplay="input"
        dateFormat="dd/mm/yy"
        id="date" />
    </div>
    <div class="w-full columnAlignCenter gap-3">
      <div
        v-for="(agenda, index) in agendaHoy"
        class="w-full agenda bg-dark-gray border-round-sm"
        :key="index">
        <div class="rowCenter">
          <div
            class="w-4 py-2"
            :class="
              agenda.profesional === 'LIBRE' ? 'titleLibre' : 'titleProfesional'
            ">
            <p class="text-blue text-center">
              {{ agenda.profesional }}
            </p>
          </div>
          <div class="w-8 px-3">
            <p class="horarioAgenda text-blue">
              {{ agenda.horario }}
            </p>
          </div>
        </div>
        <div
          class="px-3 py-2"
          v-if="
            agenda.nombre_agenda ||
            agenda.nombre_agenda === '' ||
            agenda.nombre_agenda === null
          ">
          <p class="nombreAgenda rowCenter gap-2 text-blue">
            Nombre de la agenda: <span>"{{ agenda.nombre_agenda }}"</span
            >
          </p>
        </div>
      </div>
    </div>
  </main>
  <div>
    <p v-if="agendasConsultorio">{{ agendasConsultorio[0] }}</p>
  </div>
</template>

<script>
  import { agendas } from "@/constants/models.js";
  import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
  import { useRouter, useRoute } from "vue-router";

  export default {
    name: "ConsultorioDetailsView",
    data() {
      return {
        route: useRoute(),
        router: useRouter(),
        agendasConsultorio: null,
        consultorioDate: new Date(),
        agendaHoy: [
          {
            profesional: "LIBRE",
            horario: "07:00hs - 09:30hs",
          },
          {
            profesional: "Juan Perez",
            horario: "09:30hs - 13:30hs",
            nombre_agenda: "Juan Perez",
          },
          {
            profesional: "Juan Perez",
            horario: "09:30hs - 13:30hs",
            nombre_agenda: "Juan Perez",
          },
          {
            profesional: "LIBRE",
            horario: "16:00hs - 20:00hs",
          },
        ],
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
      this.agendasConsultorio = this.getAgendasFiltradas();
    },
    computed: {
      sectorId() {
        return this.route.params.sector_id;
      },
      consultorioId() {
        return this.route.params.consultorio_id;
      },
      items() {
        return [
          {
            label: "Sectores",
            command: () => this.router.push({ path: ROUTES_NAMES.Sectors }),
          },
          {
            label: `Sector ${this.sectorId}`,
            command: () =>
              this.router.push({
                path: `${ROUTES_NAMES.SectorDetails}/${this.sectorId}`,
              }),
          },
          {
            label: `Consultorio ${this.consultorioId}`,
          },
        ];
      },
    },
  };
</script>

<style>
  .fechaConsultorio .p-calendar .p-inputtext {
    font-weight: 500;
    padding-left: 2.5rem;
  }

  .fechaConsultorio
    .p-calendar:not(.p-calendar-disabled).p-focus
    > .p-inputtext {
    box-shadow: none;
  }

  .fechaConsultorio .p-calendar .p-icon {
    position: absolute;
    top: 27.5%;
    left: 0.875rem;
    color: var(--color-blue);
  }
</style>

<style scoped>
  label {
    font-weight: 500;
  }

  p {
    font-size: 0.75rem;
  }

  .agenda {
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  .titleLibre {
    background-color: rgba(141, 222, 94, 1);
    border-radius: 5px 0 0 5px;
    font-weight: 700;
  }

  .titleProfesional {
    background-color: var(--color-light-blue);
    font-weight: 700;
  }

  .horarioAgenda {
    font-weight: 700;
  }

  .nombreAgenda {
    font-size: 0.625rem;
  }
</style>
