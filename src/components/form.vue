<template>
  <UForm
    :schema="schema"
    :state="model"
    class="h-full flex flex-col justify-between py-2"
    @submit="onSubmit"
  >
    <div class="space-y-4">
      <UFormField label="Name" name="account" required size="xl">
        <UInput v-model="model.account" size="xl" />
      </UFormField>

      <UFormField
        v-if="!isUpdate"
        label="Secret key"
        name="key"
        required
        size="xl"
      >
        <UInput
          v-model="model.key"
          size="xl"
          :type="show ? 'text' : 'password'"
        >
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
    <div class="flex justify-end">
      <UButton
        type="submit"
        size="xl"
        :ui="{
          base: 'glass text-default text-bold rounded-full w-1/2 justify-center',
        }"
      >
        Submit
      </UButton>
    </div>
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
