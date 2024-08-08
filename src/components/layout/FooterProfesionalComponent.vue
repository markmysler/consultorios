<template>
  <footer class="w-full bg-light-blue rowSpaceBetween">
    <router-link
      class="columnAlignCenter gap-1 no-underline"
      :to="item.link"
      v-for="(item, index) in menuAdmin"
      :key="index">
      <div class="icon" :class="item.icon"></div>
      <p class="text-blue">{{ item.name }}</p>
    </router-link>
  </footer>
</template>

<script>
  import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";

  export default {
    data() {
      return {
        routes: ROUTES_NAMES,
        menuAdmin: [
          {
            link: ROUTES_NAMES.Sectors,
            icon: "iconConsultorios",
            name: "Consultorios",
          },
          {
            link: ROUTES_NAMES.Search,
            icon: "iconSearch",
            name: "Buscador",
          },
          {
            link: ROUTES_NAMES.Profile,
            icon: "iconProfile",
            name: "Mi perfil",
          },
        ],
      };
    },
  };
</script>