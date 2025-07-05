<template>
  <div
    class="h-svh grid grid-rows-[auto_1fr] relative overflow-hidden pb-[var(--ion-safe-area-bottom)] pt-[var(--ion-safe-area-top)]"
  >
    <header class="py-4 relative space-y-4">
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
      </UContainer>
      <UContainer v-if="$route.name === 'index'" as="div">
        <UInput
          v-model="search"
          placeholder="Search..."
          size="xl"
          variant="soft"
          :ui="{ base: 'p-3 text-md rounded-2xl' }"
        >
          <template v-if="search?.length" #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              icon="i-lucide-circle-x"
              aria-label="Clear input"
              @click="search = ''"
            />
          </template>
        </UInput>
      </UContainer>
    </header>
    <UContainer as="main" class="px-4 overflow-y-auto overflow-x-hidden">
      <slot />
    </UContainer>
    <UContainer class="fixed">
      <UPopover
        v-if="$route.name === 'index'"
        :content="{
          align: 'end',
          side: 'top',
          sideOffset: 5,
        }"
        class="fixed bottom-6 right-6"
      >
        <UButton
          icon="i-heroicons-plus"
          variant="solid"
          class="rounded-full"
          size="xl"
          :ui="{ leadingIcon: 'size-9' }"
        />

        <template #content>
          <UNavigationMenu
            orientation="vertical"
            :items="items"
            class="text-xl"
          />
        </template>
      </UPopover>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
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

const { search } = useCodeState();
const items = ref<NavigationMenuItem[]>([
  {
    label: "Enter a setup key",
    icon: "i-heroicons-key",
    to: "/form",
  },
  {
    label: "Skan a QR code",
    icon: "i-heroicons-qr-code",
    to: "/scan",
  },
]);
</script>
