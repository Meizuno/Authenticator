export default defineAppConfig({
  ui: {
    colors: {
      primary: "blue",
      neutral: "zinc",
    },
    input: {
      slots: {
        root: "w-full",
      },
    },
    select: {
      slots: {
        base: "w-full",
      },
    },
    navigationMenu: {
      slots: {
        link: "text-xl gap-2",
        linkLeadingIcon: "size-6"
      },
    },
    toast: {
      slots: {
        root: "rounded-2xl w-24 mx-auto text-center",
      },
    }
  },
});
