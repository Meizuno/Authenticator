<template>
  <div class="h-full relative flex flex-col">
    <div v-if="codes.length" class="flex-1 space-y-4">
      <div v-for="code in codes" :key="code.id" class="flex flex-col gap-4">
        <ItemCard :code="code" />
        <USeparator />
      </div>
    </div>
    <div v-else class="flex-1 flex gap-2 items-center justify-center text-muted">
      <span>Scan code or enter key</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { codes } = useCodeState();
</script>
