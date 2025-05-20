<template>
  <UDropdownMenu :items="items">
    <UButton
      color="neutral"
      variant="ghost"
      icon="i-lucide-ellipsis-vertical"
    />
  </UDropdownMenu>
  <UModal v-model:open="modalOpen" class="size-64">
    <template #title>
      <h2>QR Code</h2>
    </template>
    <template #content>
      <img :src="qrCodeUrl" alt="QR Code" >
    </template>
    <template #description>
      <p>Scan with your authenticator app</p>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import type { Code } from "~/db";
import QRCode from "qrcode";

const props = defineProps<{
  code: Code;
}>();

const { generate } = useOTPState();
const qrCodeUrl = ref("");
const modalOpen = ref(false);

const otpUrl = `otpauth://totp/${props.code.name}:${props.code.key}?secret=${props.code.key}&issuer=${props.code.name}`;
qrCodeUrl.value = await QRCode.toDataURL(otpUrl);

const copyToClipboard = async () => {
  const generated = generate(props.code.key);
  await navigator.clipboard.writeText(generated.replace(" ", ""));
};

const items: DropdownMenuItem[][] = [
  [
    {
      label: "QR Code",
      icon: "i-lucide-qr-code",
      onSelect: () => {
        modalOpen.value = true;
      },
    },
    {
      label: "Copy",
      icon: "i-lucide-copy",
      onSelect: () => {
        copyToClipboard();
      },
    },
    {
      label: "Edit",
      icon: "i-lucide-pencil",
    },
  ],
  [
    {
      label: "Delete",
      color: "error",
      icon: "i-lucide-trash",
    },
  ],
];
</script>
