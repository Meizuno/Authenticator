<template>
  <div
    class="h-svh grid grid-rows-[auto_1fr] relative overflow-hidden"
    :class="safePadding"
  >
    <header class="py-4 relative">
      <UContainer class="relative">
        <UButton
          v-if="route.name !== 'index'"
          icon="i-material-symbols:arrow-back-ios"
          class="absolute -top-1 gap-0 text-md"
          label="Back"
          variant="ghost"
          @click="router.back()"
        />
        <div class="flex items-center justify-center gap-2">
          <img src="/favicon.ico" alt="Favicon" class="size-5">
          <div class="text-xl font-bold text-center">Authenticator</div>
        </div>
      </UContainer>
    </header>
    <UContainer as="main" class="px-4 overflow-y-auto">
      <slot />
    </UContainer>
    <UContainer class="fixed">
      <UPopover
        v-if="route.name === 'index'"
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
import { Capacitor } from "@capacitor/core";

const safePadding = ref("");

if (Capacitor.getPlatform() === "ios") {
  safePadding.value = "pt-12 pb-8";
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
