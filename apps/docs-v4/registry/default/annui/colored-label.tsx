import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { colord } from "colord"

import { cn } from "@/registry/default/lib/utils"

interface ColoredLabelProps extends React.ComponentPropsWithoutRef<"div"> {
  color?: string
  darkColor?: string
  bgOpacity?: number
  textOpacity?: number
  darkBgOpacity?: number
  darkTextOpacity?: number
}

const ColoredLabel = React.forwardRef<
  React.ComponentRef<"div">,
  ColoredLabelProps & { asChild?: boolean }
>(
  (
    {
      children,
      className,
      color,
      darkColor = color,
      bgOpacity = 0.1,
      textOpacity = 1,
      darkBgOpacity = bgOpacity,
      darkTextOpacity = textOpacity,
      asChild,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div"

    return (
      <Comp
        ref={ref}
        className={cn(
          "rounded-md text-xs px-1.5 py-0.5 w-fit font-medium bg-[var(--bg-color)] text-[var(--text-color)] dark:bg-[var(--dark-bg-color)] dark:text-[var(--dark-text-color)]",
          className
        )}
        style={
          {
            "--bg-color": color
              ? colord(color).alpha(bgOpacity).toRgbString()
              : undefined,
            "--text-color": color
              ? colord(color).alpha(textOpacity).toRgbString()
              : undefined,
            "--dark-bg-color": darkColor
              ? colord(darkColor).alpha(darkBgOpacity).toRgbString()
              : undefined,
            "--dark-text-color": darkColor
              ? colord(darkColor).alpha(darkTextOpacity).toRgbString()
              : undefined,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
ColoredLabel.displayName = "ColoredLabel"

export { ColoredLabel }
