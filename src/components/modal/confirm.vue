<template>
  <UModal v-model:open="open" :close="false" :ui="{ footer: 'justify-end' }">
    <template #title>
      <div>Delete OTP</div>
    </template>
    <template #description>
      <p>Are you sure you want to delete this code?</p>
    </template>
    <template #footer>
      <UButton
        label="Cancel"
        color="neutral"
        variant="outline"
        @click="open = false"
      />
      <UButton label="Delete" color="error" @click="confirm" />
    </template>
  </UModal>
</template>

<script setup lang="ts">
const open = defineModel<boolean>("open", { default: false });
const emit = defineEmits(["confirm"]);

const confirm = () => {
  open.value = false;
  emit("confirm");
};
</script>
