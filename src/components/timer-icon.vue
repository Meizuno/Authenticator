<template>
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    class="border-none"
  >
    <circle
      cx="50"
      cy="50"
      r="40"
      :stroke="colorIcon"
      stroke-width="10"
      fill="none"
      stroke-dashoffset="0"
    />
    <circle
      cx="50"
      cy="50"
      r="40"
      stroke="var(--color-neutral-300)"
      stroke-width="10"
      fill="none"
      :stroke-dasharray="circleLength"
      stroke-dashoffset="0"
      transform="rotate(-90 50 50)"
    >
      <animate
        attributeName="stroke-dashoffset"
        :from="from"
        to="0"
        :dur="`${dur}s`"
        repeatCount="indefinite"
        fill="freeze"
      />
    </circle>
    <text
      x="50%"
      y="50%"
      font-size="24"
      text-anchor="middle"
      dominant-baseline="middle"
      :fill="colorIcon"
    >
      {{ seconds }}s
    </text>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  start: { type: Number, default: 0 },
});

const { duration, seconds } = useOTPState();
const circleLength = 250;
const dur = props.start ? props.start : duration;
const from = ref(Math.floor((circleLength / duration) * dur));

const colorIcon = computed(() => {
  return seconds.value > 5 ? "var(--color-primary)" : "var(--color-error)";
});
</script>
