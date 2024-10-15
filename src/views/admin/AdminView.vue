<template>
  <main class="w-full h-full justify-content-between">
    <section class="w-full">
      <h2 class="text-center">Admin</h2>
      <div class="w-full linksAdmin rowCenter flex-wrap mt-3">
        <router-link
          v-for="(item, index) in admin"
          :to="item.link"
          class="columnAlignCenter gap-2 bg-dark-gray border-round-xl no-underline py-3"
          :key="index">
          <div class="icon" :class="item.icon"></div>
          <p class="name text-blue text-center">{{ item.name }}</p>
        </router-link>
      </div>
    </section>
    <SupportButtonComponent />
  </main>
</template>

<script>
  import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";
  import SupportButtonComponent from "@/components/support/SupportButtonComponent.vue";

  export default {
    name: "AdminView",
    components: {
      SupportButtonComponent,
    },
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
          {
            icon: "iconProfesionales",
            link: ROUTES_NAMES.Profesionales,
            name: "Profesionales",
          }
        ],
      };
    },
  };
</script>

<style scoped>
  .linksAdmin {
    column-gap: 0.5rem;
    row-gap: 0.625rem;
  }
  a {
    width: 48.5%;
    height: 5.938rem;
    justify-content: center;
    box-shadow: 0px 4px 4px 0px #00000040;
  }
  .name {
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 18.23px;
  }
</style>
