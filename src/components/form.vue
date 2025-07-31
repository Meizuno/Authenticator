<template>
  <UForm
    :validate="validate"
    :state="model"
    class="h-full flex flex-col justify-between"
    @submit="onSubmit"
  >
    <div class="space-y-4">
      <UFormField label="Name" name="account" required size="xl">
        <UInput v-model="model.account" />
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
          :color="color"
          :type="show ? 'text' : 'password'"
          :aria-invalid="score < 4"
          aria-describedby="password-strength"
          :ui="{ trailing: 'pe-1' }"
          class="w-full"
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

      <UProgress
        v-if="!isUpdate"
        :color="color"
        :model-value="score"
        :max="4"
        size="sm"
      />

      <ul v-if="!isUpdate" class="space-y-1" aria-label="Password requirements">
        <li
          v-for="(req, index) in strength"
          :key="index"
          class="flex items-center gap-1"
          :class="req.met ? 'text-success' : 'text-muted'"
        >
          <UIcon
            :name="req.met ? 'i-lucide-circle-check' : 'i-lucide-circle-x'"
            class="size-3 shrink-0"
          />

          <span class="text-xs font-light">
            {{ req.text }}
            <span class="sr-only">
              {{ req.met ? " - Requirement met" : " - Requirement not met" }}
            </span>
          </span>
        </li>
      </ul>
    </div>
    <div class="flex justify-end">
      <UButton
        type="submit"
        size="xl"
        :ui="{
          base: 'glass text-default text-bold rounded-full w-1/2 max-w-48 justify-center',
        }"
      >
        Submit
      </UButton>
    </div>
  </UForm>
</template>

<script setup lang="ts">
import type { FormError } from "@nuxt/ui";

const model = defineModel<Code>({ required: true });
const emit = defineEmits(["submit"]);

const isUpdate = Boolean(model.value.id);
const show = ref(false);

function checkStrength(str?: string) {
  const requirements = [
    {
      test: (s: string = "") => s.length >= 16,
      text: "At least 16 characters",
    },
    {
      test: (s: string = "") => s.length <= 32 && s.length > 0,
      text: "At max 32 characters",
    },
    {
      test: (s: string = "") => /^[A-Za-z]+$/.test(s || ""),
      text: "Must contain only letters (A-Z, a-z)",
    },
    {
      test: (s: string = "") => s.length % 8 === 0 && s.length > 0,
      text: "Length must be a multiple of 8",
    },
  ];

  return requirements.map((req) => ({
    met: req.test(str),
    text: req.text,
  }));
}

const strength = computed(() => checkStrength(model.value.key));
const score = computed(() => strength.value.filter((req) => req.met).length);
const color = computed(() => {
  if (score.value === 0) return "neutral";
  if (score.value <= 1) return "error";
  if (score.value <= 2) return "warning";
  if (score.value === 3) return "warning";
  return "success";
});

const validate = (state: Code): FormError[] => {
  const errors = [];
  if (!state.account)
    errors.push({ name: "account", message: "Account is required" });
  if (!state.key)
    errors.push({ name: "key", message: "Secret key is required" });

  if (strength.value.length > 0) {
    const isInvalid =
      strength.value.filter((req) => req.met === false).length > 0;

    if (isInvalid)
      errors.push({ name: "key", message: "Wrong format base32 key" });
  }

  return errors;
};

const onSubmit = async () => {
  emit("submit", model.value);
};
</script>
