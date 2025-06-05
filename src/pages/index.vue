<template>
  <div class="space-y-8">
    <div class="sticky top-0 py-2 bg-[var(--ui-bg)] z-50">
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
    </div>
    <div v-for="code in searchCodes" :key="code.id" class="space-y-4">
      <ItemCard :code="code" />
      <USeparator />
    </div>
  </div>
</template>

<script setup lang="ts">
import { App } from "@capacitor/app";

const { getCodes, codes } = useCodeState();
await getCodes();
const { start, stop } = useOTPState();

onMounted(() => {
  start();
});

onBeforeUnmount(() => {
  stop();
});

const search = ref("");
const searchCodes = computed(() => {
  return codes.value.filter((code) => {
    const searchTerm = search.value.toLowerCase();
    const account = code.account?.toLowerCase() || "";
    const service = code.service?.toLowerCase() || "";
    return account.includes(searchTerm) || service.includes(searchTerm);
  });
});

App.addListener("pause", () => {
  stop();
});

App.addListener("resume", () => {
  start();
});
</script>
