<template>
  <div>
    <div class="p-4 shadow-lg">
      <UButton
        v-if="route.name !== 'index'"
        icon="i-heroicons-arrow-left"
        class="float-left"
        @click="router.back()"
      />
      <h1 class="text-xl text-center">Authenticator</h1>
    </div>
    <div class="p-4">
      <slot />
    </div>
    <UPopover v-if="route.name === 'index'" class="fixed bottom-6 right-6">
      <UButton
        icon="i-heroicons-plus"
        variant="solid"
        class="rounded-full"
        size="xl"
      />

      <template #content>
        <UButtonGroup orientation="vertical">
          <UButton
            trailing-icon="i-heroicons-key"
            color="neutral"
            variant="outline"
            label="Enter a setup key"
            @click="router.push('/form')"
          />
          <UButton
            trailing-icon="i-heroicons-qr-code"
            color="neutral"
            variant="outline"
            label="Skan a QR code"
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
