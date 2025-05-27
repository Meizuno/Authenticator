<template>
  <div class="space-y-8">
    <UInput v-model="search" placeholder="Search..." size="xl" class="w-full" />
    <div v-for="code in searchCodes" :key="code.id" class="space-y-4">
      <ItemCard :code="code" />
      <USeparator />
    </div>
  </div>
</template>

<script setup lang="ts">
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
    return (
      code.account.toLowerCase().includes(searchTerm) ||
      code.service.toLowerCase().includes(searchTerm)
    );
  });
});
</script>
