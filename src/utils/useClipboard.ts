export const useClipboard = async (message: string) => {
  const toast = useToast();
  await navigator.clipboard.writeText(message);
  toast.clear();
  toast.add({
    title: "Copied!",
    progress: false,
    close: false,
    class: "mt-safe",
  });
};
