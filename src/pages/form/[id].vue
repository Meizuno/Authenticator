<template>
  <Form v-model="state" @submit="onSubmit" />
</template>

<script setup lang="ts">
const route = useRoute();
const id = Number(route.params.id);
const { getCode, updateCode } = useCodeState();
const state = ref<Code>({} as Code);

const code = await getCode(id);
state.value = code || ({} as Code);

const onSubmit = async () => {
  await updateCode(id, state.value);
  navigateTo("/");
};
</script>
