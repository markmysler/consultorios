<template>
  <main class="w-full">
    <h2>Admin</h2>
    <div class="w-full rowCenter gap-2 mt-3">
      <router-link
        v-for="(item, index) in admin"
        :to="item.link"
        class="w-6 columnAlignCenter gap-2 bg-dark-gray border-round-xl no-underline py-3"
        :key="index"
      >
        <div class="icon" :class="item.icon"></div>
        <p class="name text-blue">{{ item.name }}</p>
      </router-link>
    </div>
  </main>
</template>

<script>
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";

export default {
  name: "AdminView",
  data() {
    return {
      admin: [
        {
          icon: "iconReportes",
          link: ROUTES_NAMES.Reports,
          name: "Reportes",
        },
        {
          icon: "iconLicencias",
          link: ROUTES_NAMES.Licencias,
          name: "Licencias",
        },
      ],
    };
  },
};
</script>

<style scoped>
a {
  box-shadow: 0px 4px 4px 0px #00000040;
}
.name {
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 18.23px;
}
</style>
