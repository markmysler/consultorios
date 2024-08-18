<template>
  <main class="w-full">
    <h2>Buscar por:</h2>
    <TabMenu class="w-full bg-dark-gray mt-4" :model="items" />
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
  const items = ref([
    { label: 'Profesional' },
    { label: 'Consultorio' },
  ])
</script>
