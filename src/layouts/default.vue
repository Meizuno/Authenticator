<template>
  <UContainer
    class="h-svh relative flex flex-col overflow-hidden px-0 pb-[var(--ion-safe-area-bottom)] pt-[var(--ion-safe-area-top)]"
  >
    <header class="min-h-1">
      <span class="hidden">Authenticator</span>
    </header>
    <main class="flex-1 relative flex flex-col overflow-auto px-4">
      <div class="flex-1 flex flex-col gap-2">
        <slot />
        <div class="sticky bottom-0 flex justify-between items-center">
          <div>
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
          <UNavigationMenu :items="items" />
        </div>
      </div>
    </main>
  </UContainer>
</template>

<script setup lang="ts">
import { SafeArea } from "capacitor-plugin-safe-area";
import type { NavigationMenuItem } from "@nuxt/ui";

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
