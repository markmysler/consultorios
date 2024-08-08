<template>
  <main>
    <h2>Perfil</h2>
    <Button
      label="Cerrar sesion"
      severity="danger"
      class="w-6"
      @click.prevent="logout()" />
  </main>
</template>

<script>
  import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";

  export default {
    name: "ProfileView",
  };
</script>

<script setup>
  import { signOut, getAuth } from "firebase/auth";
  import { useUserStore } from "@/stores/user.js";

  import { useRouter } from "vue-router";

  const auth = getAuth();
  const store = useUserStore();
  const router = useRouter();
  const logout = async () => {
    await signOut(auth).then(() => {
      store.user = null;
      store.userData = null;
      store.userRole = null;
      router.push(ROUTES_NAMES.Login);
    });
  };
</script>
