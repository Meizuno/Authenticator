<template>
  <div>
    <div v-for="code in codes" :key="code.id">
      <ItemCard :code="code" />
    </div>
  </div>
</template>

<script setup lang="ts">
const codes = await getCodes();

const { start } = useOTPState();
start();
</script>
