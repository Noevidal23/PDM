<template>
  <div class="flex justify-center">
    <img src="/Imagen1.png" alt="logo" class="img" />
    <slot />
  </div>
</template>
\
<style>
.img {
  position: fixed;
  width: 50px;
  height: 60px;
  right: 20px;
  top: 10px;
}
</style>
