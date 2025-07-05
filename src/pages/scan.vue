<template>
  <div class="h-full w-full">
    <qrcode-stream
      :formats="['qr_code']"
      @error="onError"
      @detect="onDetect"
      @camera-on="onCameraReady"
    />
    <ModalCamera v-model:open="open" :error="error" @confirm="error = ''" />
  </div>
</template>

<script setup lang="ts">
import { QrcodeStream } from "vue-qrcode-reader";

const error = ref("");
const open = computed(() => error.value !== "");

const { addCode } = useCodeState();
const parseCode = (code: string) => {
  const url = new URL(code);

  if (url.protocol !== "otpauth:") {
    error.value = "Invalid OTP URL";
    return;
  }

  const path = url.pathname.slice(1);
  const [serviceName, accountName] = path.split(":");
  const secretKey = url.searchParams.get("secret");

  return {
    service: serviceName === "undefined" ? undefined : serviceName,
    account: accountName,
    key: secretKey,
  } as Code;
};

const onDetect = (detectedCodes: Array<{ rawValue: string }>) => {
  const code = detectedCodes[0].rawValue;
  const codeData = parseCode(code);

  if (codeData) {
    addCode(codeData);
  }
  navigateTo("/");
};

const onError = (err: Error) => {
  error.value = `[${err.name}]: `;

  if (err.name === "NotAllowedError") {
    error.value += "you need to grant camera access permission";
  } else if (err.name === "NotFoundError") {
    error.value += "no camera on this device";
  } else if (err.name === "NotSupportedError") {
    error.value += "secure context required (HTTPS, localhost)";
  } else if (err.name === "NotReadableError") {
    error.value += "is the camera already in use?";
  } else if (err.name === "OverconstrainedError") {
    error.value += "installed cameras are not suitable";
  } else if (err.name === "StreamApiNotSupportedError") {
    error.value += "Stream API is not supported in this browser";
  } else if (err.name === "InsecureContextError") {
    error.value +=
      "Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
  } else {
    error.value += err.message;
  }
};

const defaultConstraintOptions = [
  { label: "rear camera", constraints: { facingMode: "environment" } },
  { label: "front camera", constraints: { facingMode: "user" } },
];
const constraintOptions = ref(defaultConstraintOptions);

const onCameraReady = async () => {
  // NOTE: on iOS we can't invoke `enumerateDevices` before the user has given
  // camera access permission. `QrcodeStream` internally takes care of
  // requesting the permissions. The `camera-on` event should guarantee that this
  // has happened.
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter(({ kind }) => kind === "videoinput");

  constraintOptions.value = [
    ...defaultConstraintOptions,
    ...videoDevices.map(({ deviceId, label }) => ({
      label: `${label} (ID: ${deviceId})`,
      constraints: { deviceId },
    })),
  ];

  error.value = "";
};
</script>
