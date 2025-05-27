<template>
  <div
    class="flex items-center justify-between space-x-4 px-2 w-full"
    @click="copyToClipboard"
  >
    <div class="flex items-center space-x-4">
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
const props = defineProps<{
  code: Code;
}>();

const key = ref(1);
const { generate, switcher, seconds } = useOTPState();
const generated = ref(generate(props.code.key));

const codeColor = computed(() => {
  return seconds.value > 5 ? "text-primary" : "text-error";
})

watch(switcher, () => {
  key.value++;
  generated.value = generate(props.code.key);
});

onMounted(() => {
  key.value++;
});

const toast = useToast();
const copyToClipboard = async () => {
  await navigator.clipboard.writeText(generated.value.replace(" ", ""));
  toast.add({
    title: "Copied to clipboard",
    color: "success",
    icon: "i-lucide-check",
    progress: false,
    close: false,
  });
};
</script>
