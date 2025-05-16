<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Name" name="name">
      <UInput v-model="state.name" class="w-full" />
    </UFormField>

    <UFormField label="Key" name="key">
      <UInput v-model="state.key" type="password" class="w-full" />
    </UFormField>

    <UFormField label="Key Type" name="key-type">
      <USelect
        v-model="state.base"
        :items="items"
        :search-input="false"
        class="w-full"
      />
    </UFormField>

    <UButton type="submit"> Submit </UButton>
  </UForm>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { Code } from "~/db";

const BaseEnum = ["Time based", "Counter based"] as const;

const schema = z.object({
  name: z.string().min(1),
  key: z.string().min(1),
  base: z.enum(BaseEnum),
});

const items = BaseEnum.map((item) => ({
  label: item,
  value: item,
}));

const state = ref({
  name: "",
  key: "",
  base: "Time based",
} as Code );

const onSubmit = async () => {
  await addCode(state.value);
};
</script>
