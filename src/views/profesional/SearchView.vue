<template>
  <main class="w-full">
    <h2>Buscar por:</h2>
    <TabView class="mt-3">
      <TabPanel header="Profesional">
        <div class="pt-3">
          <IconField class="searchInput">
            <InputIcon class="text-blue pi pi-search" />
            <InputText placeholder="Nombre, Apellido, CUIL" class="i" />
          </IconField>
          <div class="accordions pt-2">
            <Accordion expand-icon="pi pi-plus" collapse-icon="pi pi-minus">
              <AccordionTab header="Especialidad"> Especialidad </AccordionTab>
            </Accordion>
            <Accordion expand-icon="pi pi-plus" collapse-icon="pi pi-minus">
              <AccordionTab header="Turno"> Turno </AccordionTab>
            </Accordion>
            <Accordion expand-icon="pi pi-plus" collapse-icon="pi pi-minus">
              <AccordionTab header="Disponibilidad">
                Disponibilidad
              </AccordionTab>
            </Accordion>
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Consultorio">
        <div class="pt-3"></div>
      </TabPanel>
    </TabView>
  </main>
</template>

<script>
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";

export default {
  name: "SearchView",
  data() {
    return {
      routes: ROUTES_NAMES,
    };
  },
};
</script>

<script setup>
import { useCurrentUser } from "vuefire";
import { ref } from "vue";

const user = useCurrentUser();
const items = ref([{ label: "Profesional" }, { label: "Consultorio" }]);
</script>

<style>
.searchInput .p-input-icon {
  top: 27.5%;
  left: 0.625rem;
  right: auto;
}

.searchInput .p-inputtext {
  padding-left: 2.188rem;
}
</style>
