"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ children, className, ...props }, ref) => {
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn("flex flex-col", className)}
      {...props}
    >
      {children}
    </TabsPrimitive.List>
  )
})
TabsList.displayName = "TabsList01"

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "relative group/tabs-trigger py-[.1rem] gap-2 flex items-center justify-start",
        className
      )}
      {...props}
    >
      <span className="inline-block h-6 w-1 rounded-full transition-colors bg-muted group-data-[state=active]/tabs-trigger:bg-primary duration-300" />
      <div className="font-medium text-sm gap-2 inline-flex items-center h-9 text-muted-foreground group-hover/tabs-trigger:brightness-125 group-data-[state=active]/tabs-trigger:text-primary transition-all duration-300">
        {children}
      </div>
    </TabsPrimitive.Trigger>
  )
})
TabsTrigger.displayName = "TabsTrigger01"

const TabsContent = TabsPrimitive.Content

export { Tabs, TabsList, TabsTrigger, TabsContent }
