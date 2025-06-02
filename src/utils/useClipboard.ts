export const useClipboard = async (message: string) => {
  const toast = useToast();
  await navigator.clipboard.writeText(message);
  toast.clear();
  toast.add({
    title: "Copied to clipboard",
    color: "success",
    progress: false,
    close: false,
  });
};