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
      stroke="var(--color-primary)"
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
        :from="fromStart"
        to="0"
        :dur="`${duration}s`"
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
      fill="var(--color-primary)"
    >
      {{time}}s
    </text>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({ shift: { type: Number, default: 0 } });

const duration = 30;
const circleLength = 250;
const fromStart = computed(() => {
  return circleLength - (circleLength / duration) * props.shift;
});
const time = ref(duration - props.shift);
const updateTime = () => {
  if (time.value > 1) {
    time.value -= 1;
  } else {
    time.value = duration;
  }
};
setInterval(updateTime, 1000)

</script>
