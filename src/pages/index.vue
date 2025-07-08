<template>
  <div class="h-full relative flex flex-col">
    <div class="space-y-4 py-2 flex-1">
      <div
        v-for="code in codes"
        :key="code.id"
        class="flex flex-col gap-4"
      >
        <ItemCard :code="code" />
        <USeparator />
      </div>
    </div>
    <div
      class="w-full bottom-0 left-0 flex justify-end items-center px-2 pt-2"
      :class="codes.length ? 'sticky' : 'absolute'"
    >
      <UNavigationMenu :items="items" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const { codes } = useCodeState();
const items = ref<NavigationMenuItem[]>([
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
