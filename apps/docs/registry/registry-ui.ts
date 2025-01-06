import { Registry } from "@/registry/schema"

export const ui: Registry = [
  {
    name: "focus-tabs",
    type: "registry:ui",
    dependencies: [
      "@radix-ui/react-tabs",
      "@radix-ui/react-use-controllable-state",
      "motion",
    ],
    files: [
      {
        path: "annui/focus-tabs.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "icon-hover-button",
    type: "registry:ui",
    dependencies: ["motion"],
    registryDependencies: ["button"],
    files: [
      {
        path: "annui/icon-hover-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "adaptive-container",
    type: "registry:ui",
    dependencies: ["react-use-measure", "motion"],
    files: [
      {
        path: "annui/adaptive-container.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dropdown-menu-00",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-dropdown-menu"],
    files: [
      {
        path: "annui/dropdown-menu-00.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "vercel-tabs",
    type: "registry:ui",
    dependencies: [
      "@radix-ui/react-tabs",
      "@radix-ui/react-use-controllable-state",
      "motion",
    ],
    files: [
      {
        path: "annui/vercel-tabs.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "select-filter",
    type: "registry:ui",
    dependencies: [
      "@radix-ui/react-use-controllable-state",
      "motion",
      "colord",
    ],
    registryDependencies: ["colored-label"],
    files: [
      {
        path: "annui/select-filter.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "tabs-00",
    type: "registry:ui",
    dependencies: [
      "motion",
      "@radix-ui/react-tabs",
      "@radix-ui/react-use-controllable-state",
    ],
    files: [
      {
        path: "annui/tabs-00.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "tabs-01",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-tabs"],
    files: [
      {
        path: "annui/tabs-01.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "image-carousel",
    type: "registry:ui",
    dependencies: ["motion", "@radix-ui/react-use-controllable-state"],
    files: [
      {
        path: "annui/image-carousel.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "detail-panel",
    type: "registry:ui",
    dependencies: ["motion", "@radix-ui/react-slot"],
    files: [
      {
        path: "annui/detail-panel.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "colored-label",
    type: "registry:ui",
    dependencies: ["colord", "@radix-ui/react-slot"],
    files: [
      {
        path: "annui/colored-label.tsx",
        type: "registry:ui",
      },
    ],
  },
]
