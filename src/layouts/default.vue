<template>
  <div class="h-dvh grid grid-rows-[auto_1fr]">
    <div class="p-4 shadow-lg relative">
      <UButton
        v-if="route.name !== 'index'"
        icon="i-material-symbols:arrow-back-ios"
        class="absolute top-4 left-4 gap-0 text-md"
        label="Back"
        variant="ghost"
        @click="router.back()"
      />
      <h1 class="text-xl text-center">Authenticator</h1>
    </div>
    <div class="p-4 my-4">
      <slot />
    </div>
    <UPopover
      v-if="route.name === 'index'"
      :content="{
        align: 'end',
        side: 'top',
        sideOffset: 5,
      }"
      class="fixed bottom-6 right-6"
    >
      <UButton
        icon="i-heroicons-plus"
        variant="solid"
        class="rounded-full"
        size="xl"
        :ui="{}"
      />

      <template #content>
        <UButtonGroup orientation="vertical">
          <UButton
            trailing-icon="i-heroicons-key"
            color="neutral"
            variant="outline"
            label="Enter a setup key"
            class="flex justify-between gap-4 text-lg"
            @click="router.push('/form')"
          />
          <UButton
            trailing-icon="i-heroicons-qr-code"
            color="neutral"
            variant="outline"
            label="Skan a QR code"
            class="flex justify-between gap-4 text-lg"
          />
        </UButtonGroup>
      </template>
    </UPopover>
  </div>
</template>

<script setup lang="ts">
import { UButton } from "#components";

const router = useRouter();
const route = useRoute();
</script>
