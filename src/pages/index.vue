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
const codes = await getCodes();
const { start, stop } = useOTPState();

onMounted(() => {
  start();
});

onBeforeUnmount(() => {
  stop()
});

const search = ref("");
const searchCodes = computed(() => {
  return codes.filter((code) => {
    return code.name.toLowerCase().includes(search.value.toLowerCase());
  });
})
</script>
