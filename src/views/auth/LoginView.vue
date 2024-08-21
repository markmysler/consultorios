<template>
  <div class="columnAlignCenter pt-5">
    <h2>Iniciar sesión</h2>
    <form
      @submit.prevent="login"
      class="w-full loginContainer columnAlignCenter gap-4 mt-4 px-4"
    >
      <div class="w-full column gap-1">
        <label for="email">Correo electrónico</label>
        <InputText
          type="email"
          id="email"
          placeholder="juanperez@gmail.com"
          v-model="email"
          @input="validateEmail"
          autocomplete="true"
        />
        <div class="error mt-1" v-if="validationErrors.email">
          <span class="pi pi-exclamation-circle"></span>
          <p>{{ validationErrors.email }}</p>
        </div>
      </div>
      <div class="w-full column gap-1">
        <label for="password">Contraseña</label>
        <Password
          type="password"
          id="password"
          class="w-full"
          placeholder="********"
          v-model="password"
          @input="validatePassword"
          toggleMask
          :feedback="false"
          autocomplete="true"
        />
        <div class="error mt-1" v-if="validationErrors.password">
          <span class="pi pi-exclamation-circle"></span>
          <p>{{ validationErrors.password }}</p>
        </div>
      </div>
      <div
        class="align-self-start align-items-start error mt-1"
        v-for="error in errors"
        :key="error"
      >
        <span class="pi pi-exclamation-circle"></span>
        <p>
          {{ errorMap[error] ? errorMap[error] : error }}
        </p>
      </div>
      <router-link :to="ROUTES_NAMES.ResetPassword"
        >¿Olvidaste tu contraseña?</router-link
      >
      <div class="w-full columnAlignCenter gap-3">
        <Button
          :loading="loading"
          class="primaryButton"
          label="Ingresar"
          type="submit"
        ></Button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import { ROUTES_NAMES } from "@/constants/ROUTES_NAMES";

const store = useUserStore();
const errors = ref([]);
const validationErrors = ref({
  email: null,
  password: null,
});
const errorMap = {
  "auth/invalid-email": "El email es inválido",
  "auth/invalid-credential":
    "El correo electrónico y/o la contraseña son incorrectos. Intente de nuevamente.",
  "auth/missing-password": "Escribe una contraseña",
};
const loading = ref(false);
const email = ref("");
const password = ref("");
const auth = getAuth();
const router = useRouter();

const validateEmail = () => {
  if (!email.value) {
    validationErrors.value.email = "Ingrese un correo electrónico";
  } else if (!/.+@.+\..+/.test(email.value)) {
    validationErrors.value.email =
      "El correo electrónico debe incluír un @ y un . (punto)";
  } else {
    validationErrors.value.email = null;
  }
};

const validatePassword = () => {
  if (!password.value) {
    validationErrors.value.password = "Ingrese una contraseña";
  } else {
    validationErrors.value.password = null;
  }
};

const isValid = computed(
  () => !validationErrors.value.email && !validationErrors.value.password
);

const login = () => {
  validateEmail();
  validatePassword();
  if (isValid.value) {
    loading.value = true;
    errors.value = [];
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        store.user = user;
        loading.value = false;
        router.push(ROUTES_NAMES.Search);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorMap[errorCode]) {
          errors.value.push(errorMap[errorCode]);
        } else {
          errors.value.push(errorCode);
        }
        loading.value = false;
      });
  }
};
</script>

<style scoped>
a {
  color: var(--color-black);
}
</style>
