<template>
  <UDropdownMenu
    :items="items"
    :content="{
      align: 'end',
      side: 'bottom',
      sideOffset: 7,
    }"
  >
    <UButton
      color="neutral"
      variant="ghost"
      size="xl"
      icon="i-lucide-ellipsis-vertical"
    />
  </UDropdownMenu>
  <ModalQrcode v-model:open="openQRCode" :code="code" />
  <ModalConfirm v-model:open="openConfirm" @confirm="deleteCode(code.id)" />
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const props = defineProps<{
  code: Code;
}>();

const { deleteCode } = useCodeState();
const { generate } = useOTPState();
const openQRCode = ref(false);
const openConfirm = ref(false);

const copyToClipboard = async () => {
  const generated = generate(props.code.key);
  await useClipboard(generated.replace(" ", ""));
};

const items: DropdownMenuItem[][] = [
  [
    {
      label: "Share",
      icon: "i-lucide-qr-code",
      onSelect: () => {
        openQRCode.value = true;
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
      onSelect: () => {
        navigateTo(`/form/${props.code.id}`);
      },
    },
  ],
  [
    {
      label: "Delete",
      color: "error",
      icon: "i-lucide-trash",
      onSelect: () => {
        openConfirm.value = true;
      },
    },
  ],
];
</script>
