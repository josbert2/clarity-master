"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/registry/default/lib/utils"

const DetailPanel = React.forwardRef<
  React.ComponentRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { asChild?: boolean }
>(({ children, className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      ref={ref}
      className={cn("bg-card p-4 flex flex-col gap-6", className)}
      {...props}
    >
      {children}
    </Comp>
  )
})
DetailPanel.displayName = "DetailPanel"

const DetailPanelHeader = React.forwardRef<
  React.ComponentRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { asChild?: boolean }
>(({ children, className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
      {children}
    </Comp>
  )
})
DetailPanelHeader.displayName = "DetailPanelHeader"

const DetailPanelHeaderTitle = React.forwardRef<
  React.ComponentRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { asChild?: boolean }
>(({ children, className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp ref={ref} className={cn("text-lg font-medium", className)} {...props}>
      {children}
    </Comp>
  )
})
DetailPanelHeaderTitle.displayName = "DetailPanelHeaderTitle"

const DetailPanelHeaderActions = React.forwardRef<
  React.ComponentRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { asChild?: boolean }
>(({ children, className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      ref={ref}
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    >
      {children}
    </Comp>
  )
})
DetailPanelHeaderActions.displayName = "DetailPanelHeaderActions"

const DetailPanelHeaderAction = React.forwardRef<
  React.ComponentRef<"button">,
  React.ComponentPropsWithoutRef<"button"> & { asChild?: boolean }
>(({ children, className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      className={cn(
        "group hover:bg-primary/10 transition-colors duration-200 flex gap-1 border-primary/30 border-dashed border rounded-full px-1.5 text-sm font-medium h-[22px] [&>svg]:h-[14px] [&>svg]:w-[14px] [&>span]:h-[14px] [&>span]:w-[14px] items-center",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
})
DetailPanelHeaderAction.displayName = "DetailPanelHeaderAction"

const DetailPanelSection = React.forwardRef<
  React.ComponentRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    >
      {children}
    </div>
  )
})
DetailPanelSection.displayName = "DetailPanelSection"

const DetailPanelSectionTitle = React.forwardRef<
  React.ComponentRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("text-sm font-medium", className)} {...props}>
      {children}
    </div>
  )
})
DetailPanelSectionTitle.displayName = "DetailPanelSectionTitle"

const DetailPanelSectionDescription = React.forwardRef<
  React.ComponentRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => {
  return (
    <div className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </div>
  )
})
DetailPanelSectionDescription.displayName = "DetailPanelSectionDescription"

const DetailPanelSectionContent = React.forwardRef<
  React.ComponentRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => {
  return <div className={cn(className)}>{children}</div>
})
DetailPanelSectionContent.displayName = "DetailPanelSectionContent"

const DetailPanelProperties = React.forwardRef<
  React.ComponentRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("grid gap-2", className)} {...props}>
      {children}
    </div>
  )
})
DetailPanelProperties.displayName = "DetailPanelProperties"

const DetailPanelProperty = React.forwardRef<
  React.ComponentRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { labelWidth?: string }
>(({ children, className, labelWidth = "100px", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-[minmax(0,var(--label-width))_1fr] items-center gap-4",
        className
      )}
      style={{ "--label-width": labelWidth } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  )
})
DetailPanelProperty.displayName = "DetailPanelProperty"

const DetailPanelPropertyLabel = React.forwardRef<
  React.ComponentRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("text-sm text-muted-foreground truncate", className)}
      {...props}
    />
  )
})
DetailPanelPropertyLabel.displayName = "DetailPanelPropertyLabel"

const DetailPanelPropertyValue = React.forwardRef<
  React.ComponentRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { asChild?: boolean }
>(({ children, className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp ref={ref} className={cn("text-sm font-medium", className)} {...props}>
      {children}
    </Comp>
  )
})
DetailPanelPropertyValue.displayName = "DetailPanelPropertyValue"

export {
  DetailPanel,
  DetailPanelHeader,
  DetailPanelHeaderTitle,
  DetailPanelHeaderActions,
  DetailPanelHeaderAction,
  DetailPanelSection,
  DetailPanelSectionTitle,
  DetailPanelSectionDescription,
  DetailPanelSectionContent,
  DetailPanelProperties,
  DetailPanelProperty,
  DetailPanelPropertyLabel,
  DetailPanelPropertyValue,
}
