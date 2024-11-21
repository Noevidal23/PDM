<template>
  <div class="p-5 shadow-lg rounded-md w-11/12 flex flex-col items-center">
    <h2 class="font-medium text-md text-center">
      {{ name }}
    </h2>
    <UDivider label="Editar" class="mt-5" />
    <div v-if="statusInfo" class="w-10/12">
      <div v-for="(data, index) in info" class="flex justify-between mb-3">
        <UCheckbox v-model="selected[index]" :label="data.Nombre" />
        <span class="text-sm">Valor: {{ data.Valor }} puntos</span>
      </div>
    </div>
    <UButton label="Guardar" @click="saveData" />
  </div>
</template>

<script setup>
import municipios from "../../constants/municipios.json";
import { useGetRubros } from "#build/imports";
const selected = ref([]);
const route = useRoute();
const { code, phase } = route.query;
const name = ref("");
const info = ref();
const statusInfo = ref(false);
const loadedInfo = ref();

const createApp = () => {
  name.value = municipios[code - 1].nombre;
};

const cleanSave = () => {
  loadedInfo.value.map((el) => {
    const index = parseInt(el.TipoRubro);
    selected.value[index] = false;
  });
};
const deletedValues = () => {
  let deletedIndex = [];
  loadedInfo.value.map((el) => {
    const index = el.TipoRubro;
    if (!selected.value[index]) {
      deletedIndex.push(el.id);
    }
  });
  useGetRubros().deleteRubro(deletedIndex);
};
const saveData = () => {
  let dataForSave = [];
  deletedValues();
  cleanSave();
  for (let index = 0; index < selected.value.length; index++) {
    if (selected.value[index]) {
      dataForSave.push({
        municipio: code,
        GrupoRubro: phase,
        TipoRubro: index,
        Valor: info.value[index].Valor,
      });
    }
  }
  useGetRubros().saveRubro(dataForSave);
  navigateTo({
    path: "/municipio",
    query: { code },
  });
};
const loadInfo = () => {
  useGetRubros()
    .getRubros(phase)
    .then((result) => {
      info.value = result;
      statusInfo.value = true;
    });
};
const getChecked = () => {
  useGetRubros()
    .getRubrosMunicipio(phase, code)
    .then((el) => {
      loadedInfo.value = el;

      loadedInfo.value.map((el) => {
        const index = el.TipoRubro;
        selected.value[index] = true;
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

createApp();
loadInfo();
getChecked();
</script>

<style lang="scss" scoped></style>
