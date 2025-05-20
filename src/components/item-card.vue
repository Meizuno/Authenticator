<template>
  <div
    class="flex items-center justify-between space-x-4 px-2 w-full"
    @click="copyToClipboard"
  >
    <div class="flex items-center space-x-4">
      <div class="flex items-center space-x-2 h-full">
        <TimerIcon :key="key" class="size-12" :start="seconds" />
      </div>
      <div class="flex flex-col">
        <span class="font-bold">{{ code.name }}</span>
        <span class="text-3xl text-primary">{{ generated }}</span>
      </div>
    </div>
    <ItemAction :code="code" />
  </div>
</template>

<script setup lang="ts">
import type { Code } from "~/db";

const props = defineProps<{
  code: Code;
}>();

const key = ref(1);
const { generate, switcher, seconds } = useOTPState();
const generated = ref(generate(props.code.key));

watch(switcher, () => {
  key.value++;
  generated.value = generate(props.code.key);
});

onMounted(() => {
  key.value++;
});

const copyToClipboard = async () => {
  await navigator.clipboard.writeText(generated.value.replace(" ", ""));
};

</script>
