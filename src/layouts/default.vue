<template>
  <div
    class="h-svh grid grid-rows-[auto_1fr] relative overflow-hidden pb-[var(--ion-safe-area-bottom)] pt-[var(--ion-safe-area-top)]"
  >
    <header class="py-4 relative space-y-4 shadow-md dark:shadow-black/50">
      <UContainer class="relative">
        <UButton
          v-if="$route.name !== 'index'"
          icon="i-material-symbols:arrow-back-ios"
          class="absolute -top-1 gap-0 text-md"
          label="Back"
          variant="ghost"
          @click="$router.back()"
        />
        <div class="flex items-center justify-center gap-2">
          <img src="assets/logo.ico" alt="Favicon" class="size-5" >
          <div class="text-xl font-bold text-center">Authenticator</div>
        </div>
        <UButton
          :icon="isDark ? 'i-lucide-sun': 'i-lucide-moon'"
          color="neutral"
          variant="ghost"
          class="absolute -top-0.5 right-5 gap-0 text-md"
          @click="isDark = !isDark"
        />
      </UContainer>
    </header>
    <UContainer as="main" class="overflow-y-auto overflow-x-hidden py-4">
      <slot />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { SafeArea } from "capacitor-plugin-safe-area";

SafeArea.getSafeAreaInsets().then((data) => {
  const { insets } = data;
  document.body.style.setProperty("--ion-safe-area-top", `${insets.top}px`);
  document.body.style.setProperty("--ion-safe-area-right", `${insets.right}px`);
  document.body.style.setProperty(
    "--ion-safe-area-bottom",
    `${insets.bottom}px`
  );
  document.body.style.setProperty("--ion-safe-area-left", `${insets.left}px`);
});

const colorMode = useColorMode();
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light";
  },
});
</script>
