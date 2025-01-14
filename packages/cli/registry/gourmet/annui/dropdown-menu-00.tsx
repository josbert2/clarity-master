"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuSeparator = DropdownMenuPrimitive.Separator

const DropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, children, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        "shadow-none p-2 rounded-lg w-64",
        className
      )}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Content>
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      "hover:bg-primary/10 h-14 group flex-col items-start justify-center gap-0 rounded-lg cursor-pointer",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <div className="absolute right-2 text-primary [&>svg]:w-4 [&>svg]:h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200">
      <ChevronRight />
    </div>
  </DropdownMenuPrimitive.Item>
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuItemIcon = React.forwardRef<
  React.ComponentRef<"span">,
  React.ComponentPropsWithoutRef<"span">
>(({ className, children, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "absolute flex items-center justify-center size-10 rounded-lg transition-colors duration-200 left-2 mr-2 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground [&>svg]:w-5 [&>svg]:h-5",
      className
    )}
    {...props}
  >
    {children}
  </span>
))
DropdownMenuItemIcon.displayName = "DropdownMenuItemIcon"

const DropdownMenuItemTitle = React.forwardRef<
  React.ComponentRef<"h3">,
  React.ComponentPropsWithoutRef<"h3">
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "pl-12 text-sm font-medium group-hover:text-primary transition-colors duration-200",
      className
    )}
    {...props}
  >
    {children}
  </h3>
))
DropdownMenuItemTitle.displayName = "DropdownMenuItemTitle"

const DropdownMenuItemDescription = React.forwardRef<
  React.ComponentRef<"p">,
  React.ComponentPropsWithoutRef<"p">
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "pl-12 text-xs text-muted-foreground group-hover:text-primary transition-colors duration-200",
      className
    )}
    {...props}
  >
    {children}
  </p>
))
DropdownMenuItemDescription.displayName = "DropdownMenuItemDescription"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuItemTitle,
  DropdownMenuItemDescription,
  DropdownMenuSeparator,
}
