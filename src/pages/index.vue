<template>
  <div v-if="searchCodes.length" class="space-y-4">
    <div v-for="code in searchCodes" :key="code.id" class="space-y-4">
      <ItemCard :code="code" />
      <USeparator />
    </div>
  </div>
</template>

<script setup lang="ts">
const { searchCodes } = useCodeState();
</script>
