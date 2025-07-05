<template>
  <div v-if="searchCodes.length" class="flex flex-col gap-4 pb-16">
    <div v-for="code in searchCodes" :key="code.id" class="space-y-4">
      <ItemCard :code="code" />
      <USeparator />
    </div>
  </div>
</template>

<script setup lang="ts">
const { searchCodes } = useCodeState();
</script>
