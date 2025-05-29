<template>
  <UForm
    :schema="schema"
    :state="model"
    class="h-full flex flex-col justify-between"
    @submit="onSubmit"
  >
    <div class="space-y-4">
      <UFormField label="Account name" name="account">
        <UInput v-model="model.account" />
      </UFormField>

      <UFormField label="Secret key" name="key">
        <UInput v-model="model.key" :type="show ? 'text' : 'password'">
          <template #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              :aria-label="show ? 'Hide password' : 'Show password'"
              :aria-pressed="show"
              aria-controls="password"
              @click="show = !show"
            />
          </template>
        </UInput>
      </UFormField>

      <UFormField label="Key Type" name="key-type">
        <USelect v-model="model.base" :items="items" :search-input="false" />
      </UFormField>
    </div>

    <UButton type="submit" class="w-full justify-center"> Submit </UButton>
  </UForm>
</template>

<script setup lang="ts">
import { z } from "zod";

const model = defineModel<Code>({ required: true });
const emit = defineEmits(["submit"]);

const show = ref(false);

const BaseEnum = ["Time based"] as const; // TODO "Counter based"
const schema = z.object({
  account: z.string().min(1),
  key: z
    .string()
    .regex(/^[A-Z2-7=]+$/, "Wrong key format")
    .min(16, "Wrong key format")
    .max(32, "Wrong key format")
    .refine((val) => val.length % 8 === 0, "Wrong key format"),
  base: z.enum(BaseEnum),
});

const items = BaseEnum.map((item) => ({
  label: item,
  value: item,
}));

const onSubmit = async () => {
  emit("submit", model.value);
};
</script>
