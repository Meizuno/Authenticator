<template>
  <div class="h-full py-2 relative flex flex-col">
    <div class="space-y-4 pb-2 flex-1">
      <div
        v-for="code in searchCodes"
        :key="code.id"
        class="flex flex-col gap-4"
      >
        <ItemCard :code="code" />
        <USeparator />
      </div>
    </div>
    <div
      class="w-full bottom-2 left-0 flex justify-between items-center px-2 py-4"
      :class="searchCodes.length ? 'sticky' : 'absolute'"
    >
      <UPopover
        v-model:open="popoverOpened"
        :content="{
          align: 'start',
          side: 'top',
          sideOffset: 7,
        }"
      >
        <UButton
          :icon="popoverOpened ? 'i-line-md-chevron-down' : 'i-line-md-search'"
          variant="solid"
          size="lg"
          :ui="{
            base: 'p-3 text-md bg-elevated rounded-full text-primary shadow-lg shadow-black/20 dark:shadow-black/50',
          }"
          @click="search = ''"
        />

        <template #content>
          <UInput
            v-model="search"
            placeholder="Search..."
            size="xl"
            variant="soft"
            :ui="{ base: 'p-3 text-md' }"
          >
            <template v-if="search?.length" #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                icon="i-lucide-x"
                aria-label="Clear input"
                @click="search = ''"
              />
            </template>
          </UInput>
        </template>
      </UPopover>
      <UNavigationMenu :items="items" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const { searchCodes, search } = useCodeState();
const popoverOpened = ref(false);
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
