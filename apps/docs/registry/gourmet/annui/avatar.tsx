import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { colord } from "colord"

import { cn } from "@/registry/default/lib/utils"

export const DataTable = React.forwardRef<
  React.ComponentRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { asChild?: boolean }
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("w-full rounded-md border", className)}
      {...props}
    >
      <Slot className="w-full table">{children}</Slot>
    </div>
  )
})
