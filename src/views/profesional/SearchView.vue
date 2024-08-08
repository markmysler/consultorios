<template>
  <main>
    <h2>Buscar por:</h2>
    <router-link :to="routes.Admin">ADMIN</router-link>
    <Button label="Felicidades" severity="warning" class="w-6" />
    <p v-if="user">{{ user.displayName }}</p>
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
  const user = useCurrentUser();
</script>
