<template>
  <UForm
    :schema="schema"
    :state="state"
    class="h-full flex flex-col justify-between"
    @submit="onSubmit"
  >
    <div class="space-y-4">
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
    </div>

    <UButton type="submit" class="w-full"> Submit </UButton>
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
} as Code);

const onSubmit = async () => {
  await addCode(state.value);
};
</script>
