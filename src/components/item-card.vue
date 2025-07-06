<template>
  <div class="flex items-center justify-between px-2 gap-4 max-w-full">
    <TimerIcon :key="key" class="size-10" />
    <div class="flex-1 flex flex-col overflow-hidden" @click="copyToClipboard">
      <span class="font-bold truncate">{{ name }}</span>
      <span class="text-3xl" :class="codeColor">{{ generated }}</span>
    </div>

    <ItemAction :code="code" />
  </div>
</template>

<script setup lang="ts">
import { App } from "@capacitor/app";

const props = defineProps<{
  code: Code;
}>();

const key = ref(1);
const { generate, seconds } = useOTPState();
const generated = ref(generate(props.code.key));
const name = computed(() => {
  return props.code.service
    ? `${props.code.service}: ${props.code.account}`
    : props.code.account;
});

const codeColor = computed(() => {
  return seconds.value > 5 ? "text-primary" : "text-error";
});

watch(seconds, () => {
  if (seconds.value === 30) {
    key.value++;
    generated.value = generate(props.code.key);
  }
});

const copyToClipboard = async () => {
  await useClipboard(generated.value.replace(" ", ""));
};

App.addListener("resume", () => {
  key.value++;
  generated.value = generate(props.code.key);
});
</script>
