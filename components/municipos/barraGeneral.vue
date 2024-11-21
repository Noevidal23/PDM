<template>
  <div class="px-5">
    <UMeterGroup :min="0" :max="maxValue" size="lg" icon="i-heroicons-minus">
      <template #indicator>
        <div class="flex gap-5 justify-center items-center mt-5">
          <p class="text-md font-medium">Avance total {{ percent }}%</p>
          <UIcon name="i-heroicons-information-circle" class="w-5 h-5" />
        </div>
      </template>

      <UMeter
        v-for="info in data"
        :value="showData[info.Clave]"
        :color="info.color"
        :label="info.Nombre"
        :icon="info.icon"
      />
    </UMeterGroup>
  </div>
</template>

<script setup>
const { 
  data,
  maxValue,
  showData,
  percent = 0,
} = defineProps(["data", "maxValue", "showData", "percent"]);
</script>

<style lang="scss" scoped></style>
