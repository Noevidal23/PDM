<template>
  <UContainer
    class="flex flex-col gap-4 items-center w-10/12 md:w-1/3 shadow-lg rounded-md py-12 mt-20"
  >
    <h1 class="font-medium text-xl text-center">Iniciar Sesion</h1>
    <UInput
      placeholder="Email"
      color="white"
      v-model="userData.email"
      class="w-10/12"
    />
    <UInput
      placeholder="Contraseña"
      color="white"
      type="password"
      v-model="userData.password"
      class="w-10/12"
    />
    <UButton label="Iniciar Sesion" @click="login" />
  </UContainer>
</template>

<script setup>
const { $pb } = useNuxtApp();
const userData = ref({
  email: "",
  password: "",
});

const login = async () => {
  if (userData.value.email != "" && userData.value.password != "") {
    const authData = await $pb.admins.authWithPassword(
      userData.value.email,
      userData.value.password
    );
  }

  navigateTo("/dashboard");
};
</script>

<style lang="scss" scoped></style>
