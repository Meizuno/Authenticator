<template>
  <UApp :toaster="{ position: 'bottom-center', duration: 2000, expand: false }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { App } from "@capacitor/app";
const { start, stop } = useOTPState();

onMounted(() => {
  start();
});

onBeforeUnmount(() => {
  stop();
});

App.addListener("pause", () => {
  stop();
});

App.addListener("resume", () => {
  start();
});
</script>
