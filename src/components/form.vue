<template>
  <UForm :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormField>

    <UFormField label="Key" name="key">
      <UInput v-model="state.key" type="password" />
    </UFormField>

    <UFormField label="Key Type" name="key-type">
      <USelectMenu v-model="state.base" :items="items" />
    </UFormField>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
import { z } from "zod";
import { Base, type Code } from "~/db";

const schema = z.object({
  name: z.string().min(1),
  key: z.string().min(1),
  base: z.nativeEnum(Base),
})

const items = Object.keys(Base).map(key => ({
  label: Base[key as keyof typeof Base],
}));

const state = ref<Code>({
  name: '',
  key: '',
  base: Base.TIME,
});

const onSubmit = () => {
  console.log(state.value);
};
</script>
