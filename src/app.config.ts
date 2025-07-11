export default defineAppConfig({
  ui: {
    colors: {
      primary: "blue",
      neutral: "zinc",
    },
    input: {
      slots: {
        root: "rounded-full overflow-clip w-full",
        base: "rounded-full shadow-sm dark:shadow-gray-800",
      },
    },
    formField: {
      slots: {
        label: 'px-2',
        container: 'mt-2',
        error: 'px-2'
      }
    },
    select: {
      slots: {
        base: "w-full",
      },
    },
    navigationMenu: {
      slots: {
        root: "rounded-full px-1 py-1 glass",
        link: "flex flex-col gap-1 w-18 before:rounded-full",
        linkLabel: "text-2xs font-bold",
        linkLeadingIcon: "size-6",
      },
      variants: {
        orientation: {
          horizontal: {
            list: "rounded",
            item: "py-0",
            link: "px-2",
          },
        },
        active: {
          true: {
            childLink: "before:bg-none",
            childLinkIcon: "text-default",
            link: "glass-inner rounded-full text-white",
          },
          false: {
            link: "text-default",
            linkLeadingIcon: "text-default",
          },
        },
      },
      compoundVariants: [
        {
          variant: "pill",
          active: true,
          highlight: false,
          class: {
            link: "before:bg-transparent",
          },
        },
      ],
    },
    toast: {
      slots: {
        root: "rounded-full overflow-clip glass w-24 mx-auto text-center p-3",
      },
    },
    popover: {
      slots: {
        content: "w-full rounded-2xl overflow-hidden",
      },
    },
    dropdownMenu: {
      slots: {
        content: "glass",
      },
    },
  },
});
