"use client"

import * as React from "react"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import { colord } from "colord"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { createContext } from "@/registry/default/lib/context"

import { ColoredLabel } from "./colored-label"

const transition = {
  layout: { duration: 0.3, ease: "easeInOut" },
}

const SelectFilter = React.forwardRef<
  React.ComponentRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    value?: string[]
    onChange?: (value: string[]) => void
    defaultValue?: string[]
    children: React.ReactNode
  }
>(({ children, className, ...props }, ref) => {
  const [value, setValue] = useControllableState({
    prop: props.value,
    defaultProp: props.defaultValue,
    onChange: props.onChange,
  })
  const [items, setItems] = React.useState<Record<string, SelectFilterItem>>({})

  return (
    <SelectFilterProvider
      value={{ value, onChange: setValue, items, setItems }}
    >
      <div ref={ref} className="flex flex-col gap-2 relative">
        {children}
      </div>
    </SelectFilterProvider>
  )
})
SelectFilter.displayName = "SelectFilter"

const SelectFilterItem = React.forwardRef<
  React.ComponentRef<typeof motion.button>,
  React.ComponentPropsWithoutRef<typeof motion.button> &
    React.ComponentPropsWithoutRef<typeof ColoredLabel> & {
      value: string
      children: React.ReactNode
    }
>(
  (
    {
      color,
      bgOpacity,
      textOpacity,
      darkBgOpacity,
      darkTextOpacity,
      className,
      children,
      style,
      value,
      ...props
    },
    ref
  ) => {
    const {
      value: selectedValue,
      onChange,
      setItems,
    } = useSelectFilterContext()
    const isSelected = selectedValue?.includes(value)

    React.useEffect(() => {
      setItems((prev) => ({
        ...prev,
        [value]: {
          color,
          children,
          props: { className },
        },
      }))
    }, [color, value, className, children])

    return (
      !isSelected && (
        <ColoredLabel
          color={color}
          className={cn("rounded-full h-6", className)}
          bgOpacity={bgOpacity}
          textOpacity={textOpacity}
          darkBgOpacity={darkBgOpacity}
          darkTextOpacity={darkTextOpacity}
          asChild
        >
          <motion.button
            ref={ref}
            transition={transition}
            layout
            layoutId={`select-filter-item-${value}`}
            onClick={() => {
              onChange((prev) => [...(prev ?? []), value])
            }}
            {...props}
          >
            {children}
          </motion.button>
        </ColoredLabel>
      )
    )
  }
)
SelectFilterItem.displayName = "SelectFilterItem"

const SelectFilterSelectedItem = React.forwardRef<
  React.ComponentRef<typeof motion.button>,
  {
    value: string
  }
>(({ value }, ref) => {
  const { value: selectedValue, onChange, items } = useSelectFilterContext()
  const isSelected = selectedValue?.includes(value)
  const item = items[value]
  return (
    isSelected && (
      <motion.button
        ref={ref}
        className={cn(
          "rounded-full text-xs px-1.5 h-6 w-fit font-medium flex items-center gap-0.5",
          item?.props?.className
        )}
        transition={transition}
        layout
        layoutId={`select-filter-item-${value}`}
        style={{
          backgroundColor: item?.color
            ? colord(item.color).alpha(0.1).toRgbString()
            : undefined,
          color: item?.color,
        }}
        onClick={() => {
          onChange((prev) => prev?.filter((v) => v !== value))
        }}
      >
        {item?.children}
        <X className="size-2.5" />
      </motion.button>
    )
  )
})
SelectFilterSelectedItem.displayName = "SelectFilterSelectedItem"

const SelectFilterList = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <motion.div layout className="flex-shrink-0 w-fit mx-auto">
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-2 bg-popover text-popover-foreground rounded-lg shadow-md p-2 min-w-64",
          className
        )}
        {...props}
      />
    </motion.div>
  )
})
SelectFilterList.displayName = "SelectFilterList"

const SelectFilterHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex justify-between items-center", className)}
      {...props}
    />
  )
})
SelectFilterHeader.displayName = "SelectFilterHeader"

const SelectFilterTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<"h3">
>(({ className, ...props }, ref) => {
  return (
    <h3 ref={ref} className={cn("text-sm font-medium", className)} {...props} />
  )
})
SelectFilterTitle.displayName = "SelectFilterTitle"

const SelectFilterClear = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => {
  const { onChange } = useSelectFilterContext()
  return (
    <button
      ref={ref}
      className={cn(
        "text-xs text-muted-foreground hover:text-foreground transition-colors",
        className
      )}
      onClick={() => {
        onChange(undefined)
      }}
      {...props}
    />
  )
})
SelectFilterClear.displayName = "SelectFilterClear"

const SelectFilterSelected = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    clearAll?: boolean
    color?: string
  }
>(({ className, color, clearAll = true, ...props }, ref) => {
  const { value: selectedValue, onChange } = useSelectFilterContext()
  const [hover, setHover] = React.useState(false)

  const variants = {
    hidden: { opacity: 0, transform: "translateX(-16px)" },
    visible: { opacity: 1, transform: "translateX(0)" },
  }
  return (
    <div
      ref={ref}
      className={cn(
        "absolute left-0 -top-12 mt-2 z-50 flex gap-2 p-2 overflow-hidden items-center",
        className
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      <AnimatePresence>
        {clearAll && selectedValue && selectedValue.length > 0 && hover && (
          <motion.button
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={transition}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors text-nowrap"
            onClick={() => onChange(undefined)}
          >
            Clear All
          </motion.button>
        )}
      </AnimatePresence>
      {selectedValue?.map((value) => (
        <SelectFilterSelectedItem key={value} value={value} />
      ))}
    </div>
  )
})
SelectFilterSelected.displayName = "SelectFilterSelected"

interface SelectFilterContextValue {
  value: string[] | undefined
  onChange: React.Dispatch<React.SetStateAction<string[] | undefined>>

  items: Record<string, SelectFilterItem>
  setItems: React.Dispatch<
    React.SetStateAction<Record<string, SelectFilterItem>>
  >
}

interface SelectFilterItem {
  color?: string
  children: React.ReactNode
  props?: {
    className?: string
  }
}

const [SelectFilterProvider, useSelectFilterContext] =
  createContext<SelectFilterContextValue>({
    value: undefined,
    onChange: () => {},
    items: {},
    setItems: () => {},
  })

export {
  SelectFilter,
  SelectFilterItem,
  SelectFilterList,
  SelectFilterHeader,
  SelectFilterTitle,
  SelectFilterClear,
  SelectFilterSelected,
}
