export const styles = [
  {
    name: "default",
    label: "Default",
  },
  {
    name: "gourmet",
    label: "Gourmet",
  },
] as const

export type Style = (typeof styles)[number]
