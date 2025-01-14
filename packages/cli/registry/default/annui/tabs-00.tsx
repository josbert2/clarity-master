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
Tabs.displayName = "Tabs00"

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ children, className, ...props }, ref) => {
  return (
    <AnimatePresence>
      <TabsPrimitive.List
        ref={ref}
        className={cn("flex items-center gap-x-4 gap-y-2", className)}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
    </AnimatePresence>
  )
})
TabsList.displayName = "TabsList00"

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    hoverAnimation?: boolean
  }
>(({ className, children, hoverAnimation = true, ...props }, ref) => {
  const { hoverTab, activeTab, setHoverTab } = useTabsContext()

  const variants = {
    active: { opacity: 1, width: "100%" },
    default: { opacity: 0, width: 0 },
  }

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn("relative group/tabs-trigger", className)}
      onMouseEnter={() => setHoverTab(props.value)}
      onMouseLeave={() => setHoverTab(undefined)}
      {...props}
    >
      <AnimatePresence initial={false}>
        {activeTab === props.value && (
          <motion.span
            className="inline-block absolute h-1 rounded-full w-full bg-primary left-0 bottom-0 z-10"
            variants={variants}
            initial="default"
            animate="active"
            exit="default"
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      <motion.div
        className="font-medium text-sm gap-2 inline-flex items-center h-9"
        animate={
          hoverAnimation
            ? hoverTab === props.value
              ? { y: -1 }
              : { y: 0 }
            : { y: 0 }
        }
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </TabsPrimitive.Trigger>
  )
})
TabsTrigger.displayName = "TabsTrigger00"

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
