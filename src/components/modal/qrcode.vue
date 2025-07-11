<template>
  <UModal v-model:open="open" :close="false" :ui="{ content: 'size-64' }">
    <template #title>
      <div>QR Code</div>
    </template>
    <template #content>
      <img :src="qrCodeUrl" alt="QR Code">
    </template>
    <template #description>
      <p>Scan with your authenticator app</p>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import QRCode from "qrcode";

const open = defineModel<boolean>("open", { default: false });
const props = defineProps<{
  code: Code;
}>();

const qrCodeUrl = ref("");
const otpUrl = `otpauth://totp/${props.code.service}:${props.code.account}?secret=${props.code.key}&issuer=${props.code.service}`;
qrCodeUrl.value = await QRCode.toDataURL(otpUrl);
</script>
