<template>
  <div class="flex items-center justify-between space-x-4 px-2 w-full">
    <div class="flex flex-col">
      <span class="font-bold">{{ code.name }}</span>
      <span class="text-3xl text-primary">{{ generated }}</span>
    </div>
    <div class="flex items-center space-x-2 h-full">
      <TimerIcon v-if="customIcon" class="size-12" :start="seconds" />
      <TimerIcon v-else class="size-12"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Code } from "~/db";

const props = defineProps<{
  code: Code;
}>();

const customIcon = ref(true);
const { generate, switcher, seconds } = useOTPState();
const generated = ref(generate(props.code.key));

watch(switcher, () => {
  customIcon.value = false;
  generated.value = generate(props.code.key);
});

</script>
