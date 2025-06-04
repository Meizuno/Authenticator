<template>
  <div class="flex items-center justify-between space-x-4 px-2 w-full">
    <div class="grow flex items-center space-x-4" @click="copyToClipboard">
      <div class="flex items-center space-x-2 h-full">
        <TimerIcon :key="key" class="size-10" :start="seconds" />
      </div>
      <div class="flex flex-col">
        <div class="font-bold flex gap-1">
          <span v-if="code.service">{{ code.service }}:</span>
          <span>{{ code.account }}</span>
        </div>
        <span class="text-3xl" :class="codeColor">{{ generated }}</span>
      </div>
    </div>
    <ItemAction :code="code" />
  </div>
</template>

<script setup lang="ts">
import { App } from '@capacitor/app';

const props = defineProps<{
  code: Code;
}>();

const key = ref(1);
const { generate, seconds } = useOTPState();
const generated = ref(generate(props.code.key));

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
