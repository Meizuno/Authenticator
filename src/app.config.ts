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
        root: " bg-gray-50 dark:bg-elevated rounded-full px-2 py-3 shadow-md shadow-black/20 dark:shadow-black/50",
        link: "flex flex-col gap-0",
        linkLabel: "text-2xs",
      },
      variants: {
        orientation: {
          horizontal: {
            list: "rounded divide-x divide-neutral-200 dark:divide-neutral-700",
            item: "py-0",
            link: "px-2 py-0",
          },
        },
        active: {
          false: {
            link: "text-primary",
            linkLeadingIcon: "text-primary",
          },
        },
      },
    },
    toast: {
      slots: {
        root: "rounded-full w-24 mx-auto text-center p-3",
      },
    },
    popover: {
      slots: {
        content: "w-full rounded-2xl overflow-hidden",
      },
    },
  },
});
