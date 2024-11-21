<template>
  <div class="mx-5 mt-5 flex flex-col justify-center items-center gap-5">
    <USelectMenu
      v-model="selectedMunicio"
      :options="municipios"
      placeholder="Selecciona el municipio"
      value-attribute="id"
      option-attribute="nombre"
      class="w-10/12"
    />
    <UButton label="Buscar Municipio" @click="goto" />
  </div>
</template>

<script setup>
import municipios from "../constants/municipios.json";
const router = useRouter();
const selectedMunicio = ref(0);
const goto = () => {
  if (selectedMunicio.value > 0) {
    router.push({
      path: "/municipio",
      query: { code: selectedMunicio.value },
    });
  }
};
</script>

<style lang="scss" scoped></style>
