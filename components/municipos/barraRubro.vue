<template>
  <div class="mx-5 mt-5" v-for="info in data">
    <div class="flex gap-3 items-center">
      <h1 class="font-semibold italic">{{ info.Nombre }}</h1>
      <UIcon
        name="i-heroicons-eye"
        class="w-4 h-4 cursor-pointer"
        v-if="actionType"
      />
      <UIcon
        name="i-heroicons-pencil-square"
        class="w-4 h-4 cursor-pointer"
        v-else
        @click="edit(info.Clave)"
      />
    </div>

    <UProgress
      :value="showData[info.Clave]"
      :max="info.Valor * 124"
      indicator
      v-if="actionType"
    />

    <UProgress
      :value="showData[info.Clave]"
      :max="info.Valor"
      indicator
      v-else
    />
  </div>
</template>

<script setup>
const { data, actionType, showData } = defineProps([
  "data",
  "actionType",
  "showData",
]);
const route = useRoute();
const router = useRouter();
const code = parseInt(route.query.code);
const edit = (phase) => {
  router.push({
    path: "/municipio/editar",
    query: { code, phase },
  });
};
</script>
