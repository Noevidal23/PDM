<template>
  <div class="p-5 shadow-lg rounded-md w-11/12">
    <div class="flex justify-center items-center gap-5">
      <UIcon
        name="i-heroicons-arrow-left-circle"
        class="w-5 h-5 cursor-pointer"
        @click="navigateTo('/dashboard')"
      />
      <h2 class="font-medium text-md text-center">
        {{ name }}
      </h2>
    </div>
    <MuniciposBarraGeneral
      v-if="statusInfo"
      :data="info"
      :max-value="100"
      :show-data="showData"
      :percent="percent"
    />

    <UDivider label="Rubros" class="mt-5" />

    <MuniciposBarraRubro
      v-if="statusInfo"
      :data="info"
      :action-type="false"
      :showData="showData"
    />
  </div>
</template>

<script setup>
import municipios from "../../constants/municipios.json";
import { useGetRubros } from "#build/imports";
const percent = ref();
const showData = ref({
  a: 0,
  b: 0,
  c: 0,
});
const info = ref();
const statusInfo = ref(false);
const name = ref("");
const route = useRoute();
const code = parseInt(route.query.code);
const createApp = () => {
  name.value = municipios[code - 1].nombre;
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

  getValues();
};
const verifyCode = () => {
  if (125 > code > 0) {
  } else {
    navigateTo("/dashboard");
  }
};

const getValues = () => {
  let values = {
    a: 0,
    b: 0,
    c: 0,
  };

  useGetRubros()
    .getRubrosValuesMuni(code)
    .then((el) => {
      el.items.map((result) => {
        if (result.GrupoRubro == "a") {
          values.a += result.Valor;
        }
        if (result.GrupoRubro == "b") {
          values.b += result.Valor;
        }
        if (result.GrupoRubro == "c") {
          values.c += result.Valor;
        }
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      showData.value = values;
      getPercent();
    });
};

const getPercent = () => {
  const total =
    (showData.value.a + showData.value.b + showData.value.c);
  percent.value = Number.parseFloat(total).toFixed(2);
};

verifyCode();
createApp();
</script>

<style scoped></style>
