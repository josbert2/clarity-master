"use client"

import * as React from "react"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { createContext } from "@/registry/default/lib/context"

const ImageCarousel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    defaultValue?: string
    value?: string
    onValueChange?: (value: string) => void
    collapsible?: boolean
  }
>(
  (
    { defaultValue, value, onValueChange, collapsible, className, ...props },
    ref
  ) => {
    const [activeValue, setActiveValue] = useControllableState({
      prop: value,
      defaultProp: defaultValue,
      onChange: onValueChange,
    })

    return (
      <ImageCarouselProvider
        value={{ activeValue, setActiveValue, collapsible }}
      >
        <div className={cn("flex gap-2", className)} ref={ref} {...props} />
      </ImageCarouselProvider>
    )
  }
)
ImageCarousel.displayName = "ImageCarousel"

const ImageCarouselItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof motion.div> & {
    value: string
    children: React.ReactNode
  }
>(({ children, value, className, ...props }, ref) => {
  const { activeValue, setActiveValue, collapsible } = useImageCarouselContext()

  const isActive = activeValue === value

  const transition = {
    duration: 0.3,
    ease: "easeInOut",
  }

  const variants = {
    active: {
      width: "240px",
      transition,
    },
    inactive: {
      width: "48px",
      transition,
    },
  }

  return (
    <ImageCarouselItemProvider value={{ isActive }}>
      <AnimatePresence initial={false}>
        <motion.div
          ref={ref}
          data-active={isActive}
          className={cn(
            "cursor-pointer relative rounded-xl overflow-hidden p-2 h-full transition-shadow duration-300 data-[active=true]:ring-2 data-[active=true]:ring-primary/80 data-[active=true]:ring-offset-2 data-[active=true]:ring-offset-background",
            className
          )}
          variants={variants}
          initial="inactive"
          animate={isActive ? "active" : "inactive"}
          onTap={() => {
            if (collapsible) {
              setActiveValue(isActive ? undefined : value)
            } else {
              setActiveValue(value)
            }
          }}
          {...props}
        >
          <motion.div
            className="absolute inset-0 bg-black/40 z-[1]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={transition}
          />
          {children}
        </motion.div>
      </AnimatePresence>
    </ImageCarouselItemProvider>
  )
})
ImageCarouselItem.displayName = "ImageCarouselItem"

const ImageCarouselItemImage = React.forwardRef<
  HTMLImageElement,
  React.ComponentPropsWithoutRef<"img">
>(({ className, ...props }, ref) => {
  return (
    <img
      className={cn("absolute inset-0 size-full object-cover", className)}
      ref={ref}
      {...props}
    />
  )
})
ImageCarouselItemImage.displayName = "ImageCarouselItemImage"

const ImageCarouselItemIcon = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "absolute size-8 [&>svg]:size-4 bg-primary/50 rounded-full flex items-center justify-center",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
ImageCarouselItemIcon.displayName = "ImageCarouselItemIcon"

const ImageCarouselItemTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "ml-[52px] mt-1 text-base font-semibold relative z-10",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
ImageCarouselItemTitle.displayName = "ImageCarouselItemTitle"

const ImageCarouselItemDescription = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof motion.div>
>(({ className, ...props }, ref) => {
  const { isActive } = useImageCarouselItemContext()

  const variants = {
    active: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.4,
        ease: "easeOut",
      },
    },
    inactive: {
      opacity: 0,
      y: 18,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  }

  return (
    <AnimatePresence initial={false}>
      {isActive && (
        <motion.div
          className={cn(
            "ml-[52px] mt-1 text-sm font-medium relative z-10",
            className
          )}
          ref={ref}
          variants={variants}
          initial="inactive"
          animate="active"
          exit="inactive"
          {...props}
        />
      )}
    </AnimatePresence>
  )
})
ImageCarouselItemDescription.displayName = "ImageCarouselItemDescription"

interface ImageCarouselContextValue {
  activeValue?: string
  setActiveValue: (value?: string) => void
  collapsible?: boolean
}

interface ImageCarouselItemContextValue {
  isActive: boolean
}

const [ImageCarouselProvider, useImageCarouselContext] =
  createContext<ImageCarouselContextValue>({
    activeValue: undefined,
    setActiveValue: () => {},
    collapsible: false,
  })

const [ImageCarouselItemProvider, useImageCarouselItemContext] =
  createContext<ImageCarouselItemContextValue>({
    isActive: false,
  })

export {
  ImageCarousel,
  ImageCarouselItem,
  ImageCarouselItemImage,
  ImageCarouselItemIcon,
  ImageCarouselItemTitle,
  ImageCarouselItemDescription,
}

export { useImageCarouselContext, useImageCarouselItemContext }
