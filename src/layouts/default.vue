<template>
  <UContainer
    class="h-svh relative flex flex-col overflow-hidden"
  >
    <header
      class="min-h-1 flex flex-col items-center justify-center font-bold text-2xl md:mb-2"
    >
      <span class="hidden md:inline md:py-2">OTP Genie</span>
      <USeparator class="hidden md:inline" />
    </header>
    <main class="flex-1 relative flex flex-col overflow-auto">
      <div class="flex-1 flex flex-col gap-2 pb-16 px-4">
        <slot />
      </div>
    </main>
    <div class="absolute w-full bottom-6 px-4 flex justify-between items-center">
      <div>
        <Transition name="back">
          <div v-if="$route.name !== 'index'">
            <UButton
              icon="i-iconamoon-arrow-left-2"
              size="xl"
              class="glass rounded-full p-2.5"
              :ui="{
                leadingIcon: 'size-8 text-default',
              }"
              to="/"
            />
          </div>
        </Transition>
      </div>
      <UNavigationMenu :items="items" />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { SafeArea } from "capacitor-plugin-safe-area";
import type { NavigationMenuItem } from "@nuxt/ui";
import { USeparator } from "#components";

SafeArea.getSafeAreaInsets().then((data) => {
  const { insets } = data;
  document.body.style.setProperty(
    "--ion-safe-area-top",
    `${insets.top / 16 || 1}rem`
  );
  document.body.style.setProperty(
    "--ion-safe-area-bottom",
    `${insets.bottom / 16 || 1}rem`
  );
});

const items = ref<NavigationMenuItem[]>([
  {
    label: "OTP",
    icon: "i-lets-icons-time-progress",
    to: "/",
  },
  {
    label: "Enter key",
    icon: "i-heroicons-key",
    to: "/form",
  },
  {
    label: "Scan code",
    icon: "i-heroicons-qr-code",
    to: "/scan",
  },
]);
</script>
