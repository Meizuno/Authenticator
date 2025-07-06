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

      <UFormField v-if="!isUpdate" label="Secret key" name="key">
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
    </div>

    <UButton type="submit" class="w-full justify-center"> Submit </UButton>
  </UForm>
</template>

<script setup lang="ts">
import { z } from "zod";

const model = defineModel<Code>({ required: true });
const emit = defineEmits(["submit"]);

const isUpdate = Boolean(model.value.id);
const show = ref(false);
const schema = z.object({
  account: z.string().min(1),
  key: z
    .string()
    .regex(/^[A-Z2-7=]+$/, "Wrong key format")
    .min(16, "Wrong key format")
    .max(32, "Wrong key format")
    .refine((val) => val.length % 8 === 0, "Wrong key format"),
});

const onSubmit = async () => {
  emit("submit", model.value);
};
</script>
