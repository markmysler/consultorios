<template>
  <main class="w-full">
    <h2>Buscar por:</h2>
    <TabView class="w-full mt-3">
      <TabPanel header="Profesional">
        <form class="pt-3" @submit.prevent="searchProf">
          <IconField class="searchInput">
            <InputIcon class="text-blue pi pi-search" />
            <InputText
              placeholder="Nombre, Apellido, CUIL"
              class="i"
              v-model="profesional.input"
            />
          </IconField>
          <div class="accordions pt-2">
            <Accordion
              class="accordionEspecialidad"
              expand-icon="pi pi-plus"
              collapse-icon="pi pi-minus"
            >
              <AccordionTab header="Especialidad">
                <Dropdown
                  class="w-full"
                  v-model="profesional.especialidad"
                  placeholder="Seleccione una especialidad"
                  :options="especialidades"
                  filter
                  showClear
                />
              </AccordionTab>
            </Accordion>
            <Accordion expand-icon="pi pi-plus" collapse-icon="pi pi-minus">
              <AccordionTab header="Turno">
                <div class="checkboxes rowCenter">
                  <div class="rowCenter gap-1">
                    <Checkbox
                      v-model="profesional.turno"
                      inputId="matutino"
                      name="turno"
                      value="matutino"
                    />
                    <label class="text-blue" for="matutino">Matutino</label>
                  </div>
                  <div class="rowCenter gap-1">
                    <Checkbox
                      v-model="profesional.turno"
                      inputId="vespertino"
                      name="turno"
                      value="vespertino"
                    />
                    <label class="text-blue" for="vespertino">Vespertino</label>
                  </div>
                </div>
              </AccordionTab>
            </Accordion>
            <Accordion expand-icon="pi pi-plus" collapse-icon="pi pi-minus">
              <AccordionTab header="Especificar horario laboral">
                <div class="rowCenter gap-6">
                  <div class="rowCenter gap-1">
                    <RadioButton
                      v-model="profesional.horarioLaboral"
                      inputId="si"
                      name="horarioLaboral"
                      value="si"
                    />
                    <label class="text-blue" for="si">Si</label>
                  </div>
                  <div class="rowCenter gap-1">
                    <RadioButton
                      v-model="profesional.horarioLaboral"
                      inputId="no"
                      name="horarioLaboral"
                      value="no"
                    />
                    <label for="no">No</label>
                  </div>
                </div>
              </AccordionTab>
            </Accordion>
            <Accordion
              v-if="profesional.horarioLaboral === 'si'"
              expand-icon="pi pi-plus"
              collapse-icon="pi pi-minus"
            >
              <AccordionTab header="Horario Laboral">
                <div class="rowCenter gap-2">
                  <Calendar
                    v-model="profesional.fecha"
                    showIcon
                    fluid
                    iconDisplay="input"
                    dateFormat="dd/mm/yy"
                    id="date"
                  />
                  <Calendar
                    v-model="profesional.horario"
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
              </AccordionTab>
            </Accordion>
          </div>
          <div class="error mt-3" v-if="showError">
            <span class="pi pi-exclamation-circle"></span>
            <p>Complete al menos un campo antes de buscar.</p>
          </div>
          <Button
            :loading="loading"
            class="primaryButton mt-3"
            label="Buscar"
            type="submit"
          ></Button>
        </form>
      </TabPanel>
      <TabPanel header="Consultorio">
        <form class="pt-3" @submit.prevent="searchCons">
          <IconField class="searchInput mb-2">
            <InputIcon class="text-blue pi pi-search" />
            <InputText
              placeholder="Nombre de Agenda"
              class="i"
              v-model="consultorio.input"
            />
          </IconField>
          <div class="rowCenter gap-2">
            <Dropdown
              class="w-full dropDownSector"
              v-model="consultorio.sector"
              placeholder="Sector"
              :options="Object.keys(sectors)"
              showClear
            />
            <Dropdown
              class="w-full dropDownNumero"
              v-model="consultorio.numero"
              placeholder="Número"
              :options="consultorios[sectors[consultorio.sector]]"
              showClear
            />
          </div>
          <div class="accordions pt-2">
            <Accordion
              class="accordionEspecialidad"
              expand-icon="pi pi-plus"
              collapse-icon="pi pi-minus"
            >
              <AccordionTab header="Especialidad">
                <Dropdown
                  class="w-full"
                  v-model="consultorio.especialidad"
                  placeholder="Seleccione una especialidad"
                  :options="especialidades"
                  filter
                  showClear
                />
              </AccordionTab>
            </Accordion>
            <Accordion expand-icon="pi pi-plus" collapse-icon="pi pi-minus">
              <AccordionTab header="Disponibilidad">
                <div class="rowCenter gap-6">
                  <div class="rowCenter gap-1">
                    <Checkbox
                      v-model="consultorio.disponibilidad"
                      inputId="ocupado"
                      name="disponibilidad"
                      value="ocupado"
                    />
                    <label for="ocupado" class="text-blue">Ocupado</label>
                  </div>
                  <div class="rowCenter gap-1">
                    <Checkbox
                      v-model="consultorio.disponibilidad"
                      inputId="libre"
                      name="disponibilidad"
                      value="libre"
                    />
                    <label for="libre" class="text-blue">Libre</label>
                  </div>
                </div>
              </AccordionTab>
            </Accordion>
            <Accordion
              v-if="
                consultorio.disponibilidad === 'libre' ||
                consultorio.disponibilidad === 'ocupado'
              "
              expand-icon="pi pi-plus"
              collapse-icon="pi pi-minus"
            >
              <AccordionTab header="Fecha y hora">
                <div class="rowCenter gap-2">
                  <Calendar
                    v-model="consultorio.fecha"
                    showIcon
                    fluid
                    iconDisplay="input"
                    dateFormat="dd/mm/yy"
                    id="date"
                  />
                  <Calendar
                    v-model="consultorio.horario"
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
              </AccordionTab>
            </Accordion>
          </div>
          <div class="error mt-3" v-if="showError">
            <span class="pi pi-exclamation-circle"></span>
            <p>Complete al menos un campo antes de buscar.</p>
          </div>
          <Button
            :loading="loading"
            class="primaryButton mt-3"
            label="Buscar"
            type="submit"
          ></Button>
        </form>
      </TabPanel>
    </TabView>
  </main>
</template>

<script>
import { ref } from "vue";
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
import { sectorSearch } from "@/constants/sectorsMap.js";
import { consultorios } from "@/constants/models";
import { especialidades } from "@/constants/especialidades";
import searchProfessional from "@/utils/searchProfessional";

export default {
  name: "SearchView",
  setup() {
    const routes = ref(ROUTES_NAMES);
    const loading = ref(false);
    const showError = ref(false);

    const profesional = ref({
      input: "",
      especialidad: null,
      turno: null,
      horarioLaboral: "no",
      fecha: new Date(),
      horario: new Date(),
    });

    const consultorio = ref({
      input: "",
      sector: null,
      numero: null,
      especialidad: null,
      disponibilidad: null,
      fecha: new Date(),
      horario: new Date(),
    });

    const isFormEmpty = (formData) => {
      const isDefaultDate = (date) => {
        const defaultDate = new Date();
        return (
          date.getDate() === defaultDate.getDate() &&
          date.getMonth() === defaultDate.getMonth() &&
          date.getFullYear() === defaultDate.getFullYear()
        );
      };

      const isDefaultTime = (time) => {
        const defaultTime = new Date();
        return (
          time.getHours() === defaultTime.getHours() &&
          time.getMinutes() === defaultTime.getMinutes()
        );
      };

      return Object.entries(formData).every(([key, value]) => {
        if (key === "horarioLaboral" && value === "no") return true;
        if (key === "fecha" && isDefaultDate(value)) return true;
        if (key === "horario" && isDefaultTime(value)) return true;
        return (
          value === "" ||
          value === null ||
          (Array.isArray(value) && value.length === 0)
        );
      });
    };

    const searchProf = () => {
      if (isFormEmpty(profesional.value)) {
        showError.value = true;
        return;
      }

      showError.value = false;
      loading.value = true;

      const search = {
        input_text: profesional.value.input,
        specialty: profesional.value.especialidad
          ? profesional.value.especialidad
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          : null,
        shift:
          profesional.value.turno && profesional.value.turno.length !== 0
            ? [...profesional.value.turno]
            : null,
        date_string:
          profesional.value.fecha && profesional.value.horarioLaboral === "si"
            ? profesional.value.fecha.toLocaleDateString("en-US")
            : null,
        time:
          profesional.value.horario && profesional.value.horarioLaboral === "si"
            ? `${profesional.value.horario.getHours()}:${profesional.value.horario.getMinutes()}`
            : null,
      };

      const response = searchProfessional(search);
      console.log(response);

      loading.value = false;
    };

    const searchCons = () => {
      if (isFormEmpty(consultorio.value)) {
        showError.value = true;
        return;
      }

      showError.value = false;
      loading.value = true;

      console.log(consultorio.value);

      loading.value = false;
    };

    return {
      routes,
      consultorios,
      sectors: sectorSearch,
      especialidades,
      loading,
      showError,
      profesional,
      consultorio,
      searchProf,
      searchCons,
    };
  },
};
</script>

<style>
/* Tabs */
.p-tabview {
  max-width: 400px;
}

/* Search + Icon */

.searchInput .p-input-icon {
  top: 27.5%;
  left: 0.625rem;
  right: auto;
}

.searchInput .p-inputtext {
  font-weight: 600;
  padding-left: 2.188rem;
}

.accordions .p-inputtext {
  font-weight: 600;
}

.accordions .p-accordion-header-text {
  font-size: 0.875rem;
}

.accordionEspecialidad .p-inputtext,
.dropDownSector .p-inputtext,
.dropDownNumero .p-inputtext {
  color: var(--color-blue);
}

/* Checkbox */

.checkboxes {
  gap: 3.125rem;
}

.checkboxes label {
  font-size: 0.75rem;
  font-weight: 700;
}

.accordions .p-checkbox .p-checkbox-box {
  width: 1.125rem;
  height: 1.125rem;
  background: var(--color-gray);
  border: 1px solid var(--color-blue);
  border-radius: 5px;
}

.accordions .p-checkbox.p-highlight .p-checkbox-box {
  background: var(--color-blue);
}

.accordions .p-calendar .p-inputtext {
  color: var(--color-blue);
  padding-left: 2.25rem;
}

.accordions .p-calendar .p-datepicker-trigger-icon,
.accordions .pi-clock {
  font-size: 1rem;
  position: absolute;
  top: 27.5%;
  left: 0.688rem;
  color: var(--color-blue);
}

/* Radio */

.accordions .p-radiobutton.p-highlight .p-radiobutton-box {
  border-color: var(--color-blue);
  background: var(--color-blue);
}
</style>
