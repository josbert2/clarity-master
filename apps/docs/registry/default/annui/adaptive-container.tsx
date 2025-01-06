"use client"

import * as React from "react"
import {
  AnimatePresence,
  AnimationControls,
  motion,
  TargetAndTransition,
  Transition,
} from "motion/react"
import useMeasure from "react-use-measure"

const AdaptiveContainer = ({
  children,
  animate,
  transition,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  animate?: AnimationControls | TargetAndTransition
  transition?: Transition
}) => {
  const [ref, { width, height }] = useMeasure()

  return (
    <AnimatePresence initial={false}>
      <motion.div
        animate={{
          height: height > 0 ? height : undefined,
          width: width > 0 ? width : undefined,
          ...animate,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          ...transition,
        }}
        className="overflow-hidden"
      >
        <div ref={ref} {...props}>
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export { AdaptiveContainer }
