<template>
  <div class="h-dvh grid grid-rows-[auto_1fr] relative" :class="safePadding">
    <header class="py-4 shadow-lg relative">
      <UContainer class="relative">
        <UButton
          v-if="route.name !== 'index'"
          icon="i-material-symbols:arrow-back-ios"
          class="absolute -top-1 gap-0 text-md"
          label="Back"
          variant="ghost"
          @click="router.back()"
        />
        <h1 class="text-xl text-center">Authenticator</h1>
      </UContainer>
    </header>
    <UContainer as="main" class="p-4 my-4">
      <slot />
    </UContainer>
    <UContainer class="relative">
      <UPopover
        v-if="route.name === 'index'"
        :content="{
          align: 'end',
          side: 'top',
          sideOffset: 5,
        }"
        class="absolute bottom-6 right-6"
      >
        <UButton
          icon="i-heroicons-plus"
          variant="solid"
          class="rounded-full"
          size="xl"
        />

        <template #content>
          <UNavigationMenu orientation="vertical" :items="items" class="text-xl" />
        </template>
      </UPopover>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { Capacitor } from "@capacitor/core";

const safePadding = ref("");

if (Capacitor.getPlatform() === "ios") {
  safePadding.value = "pt-12 pb-2";
}

const router = useRouter();
const route = useRoute();

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
