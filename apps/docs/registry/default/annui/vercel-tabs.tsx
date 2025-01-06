"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { createContext } from "@/registry/default/lib/context"

const Tabs = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ value, onValueChange, defaultValue, ...props }, ref) => {
  const [activeTab, setActiveTab] = useControllableState({
    prop: value,
    defaultProp: defaultValue,
    onChange: onValueChange,
  })

  const [hoverTab, setHoverTab] = React.useState<string | undefined>(undefined)

  return (
    <TabsProvider value={{ activeTab, setActiveTab, hoverTab, setHoverTab }}>
      <TabsPrimitive.Root
        ref={ref}
        value={activeTab}
        onValueChange={setActiveTab}
        {...props}
      />
    </TabsProvider>
  )
})
Tabs.displayName = "VercelTabs"

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ children, className, ...props }, ref) => {
  return (
    <AnimatePresence>
      <TabsPrimitive.List
        ref={ref}
        className={cn("flex items-center", className)}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
    </AnimatePresence>
  )
})
TabsList.displayName = "VercelTabsList"

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const { hoverTab, activeTab, setHoverTab } = useTabsContext()

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "p-3 inline-block shrink-0 relative transition-colors select-none leading-[.875rem] font-normal text-[.875rem]",
        className
      )}
      onMouseEnter={() => setHoverTab(props.value)}
      onMouseLeave={() => setHoverTab(undefined)}
      {...props}
    >
      {hoverTab === props.value && (
        <motion.span
          className="absolute top-[7px] left-0 right-0 h-8 rounded-md contain-strict bg-secondary -z-[1]"
          transition={{ duration: 0.15 }}
          layoutId="vercel-tabs-hover"
        />
      )}
      {activeTab === props.value && (
        <motion.span
          className="block absolute h-[2px] w-full bg-primary left-0 bottom-1"
          layoutId="vercel-tabs-active"
          transition={{ duration: 0.15 }}
        />
      )}
      {children}
    </TabsPrimitive.Trigger>
  )
})
TabsTrigger.displayName = "VercelTabsTrigger"

const TabsContent = TabsPrimitive.Content

interface TabsContextValue {
  activeTab: string | undefined
  setActiveTab: (tab: string) => void

  hoverTab: string | undefined
  setHoverTab: (tab: string | undefined) => void
}

const [TabsProvider, useTabsContext] = createContext<TabsContextValue>({
  activeTab: undefined,
  setActiveTab: () => {},
  hoverTab: undefined,
  setHoverTab: () => {},
})

export { Tabs, TabsList, TabsTrigger, TabsContent }
export { useTabsContext }
