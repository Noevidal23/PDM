<template>
  <div class="">
    <h1 class="font-bold text-xl text-pretty text-center">
      Avance Estatal Plan de Desarrollo Municipal
    </h1>
    <MuniciposBarraGeneral
      v-if="statusInfo"
      :data="info"
      :max-value="12400"
      :showData="showData"
      :percent="percent"
    />
    <UDivider label="Por Rubro" class="mt-5" />
    <MuniciposBarraRubro
      v-if="statusInfo"
      :data="info"
      :action-type="true"
      :showData="showData"
    />
    <UDivider label="Buscar Municipio" class="mt-5" />
    <BuscarMunicipio />
  </div>
</template>

<script setup>
import { useGetRubros } from "#build/imports";
const percent = ref("0");
const info = ref();
const statusInfo = ref(false);
const showData = ref({
  a: 0,
  b: 0,
  c: 0,
});
const globalValues = ref([]);
const createApp = () => {
  let temporalValues = [];
  useGetRubros()
    .getGrupos()
    .then((result) => {
      info.value = result;
      statusInfo.value = true;
    })
    .catch((err) => {
      console.log(err);
      navigateTo("/dashboard");
    });

  useGetRubros()
    .getRubrosValues()
    .then((el) => {
      temporalValues = el;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      globalValues.value = temporalValues;
      showData.value = createValores();
      getPercent();
    });
};

const getPercent = () => {
  const total =
    (showData.value.a + showData.value.b + showData.value.c) / 12400;
  percent.value = Number.parseFloat(total).toFixed(2);
};

const createValores = () => {
  let valores = {
    a: 0,
    b: 0,
    c: 0,
  };

  globalValues.value.map((el) => {
    if (el.GrupoRubro == "a") {
      valores.a += el.Valor;
    }
    if (el.GrupoRubro == "b") {
      valores.b += el.Valor;
    }
    if (el.GrupoRubro == "c") {
      valores.c += el.Valor;
    }
  });
  return valores;
};
onMounted(() => {
  createApp();
});
</script>

<style lang="scss" scoped></style>
