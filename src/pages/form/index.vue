<template>
  <Form v-model="state" @submit="onSubmit" />
</template>

<script setup lang="ts">

const state = ref({
  name: "",
  key: "",
  base: "Time based",
} as Code);

const { addCode } = useCodeState();

const onSubmit = async () => {
  await addCode(state.value);
  navigateTo("/");
};
</script>
