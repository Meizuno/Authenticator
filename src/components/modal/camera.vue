<template>
  <UModal v-model:open="open" :close="false" :ui="{ footer: 'justify-end' }">
    <template #title>
      <div>Camera Error</div>
    </template>
    <template #description>
      <p>{{ error }}</p>
    </template>
    <template #footer>
      <UButton label="OK" color="primary" variant="ghost" @click="confirm" />
    </template>
  </UModal>
</template>

<script setup lang="ts">
const open = defineModel<boolean>("open", { default: false });
const emit = defineEmits(["confirm"]);
defineProps({
  error: {
    type: String,
    required: true
  }
})

const confirm = () => {
  emit("confirm");
};
</script>
