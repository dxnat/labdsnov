"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { cn } from "cn"

import { toggleVariants, type ToggleSize, type ToggleVariant } from "../Toggle"
import styles from "./ToggleGroup.module.css"

type ToggleGroupContextValue = {
  variant?: ToggleVariant
  size?: ToggleSize
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({})

type ToggleGroupProps = ToggleGroupPrimitive.Props &
  ToggleGroupContextValue & {
    /** Gap between items in spacing units (4px). `0` joins them into one bar. */
    spacing?: number
  }

/**
 * A set of toggles. One can be pressed at a time unless `multiple` is set.
 * `value` / `defaultValue` are arrays of the pressed items' `value`s.
 */
function ToggleGroup({
  className,
  variant = "default",
  size = "default",
  spacing = 2,
  orientation = "horizontal",
  style,
  children,
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      orientation={orientation}
      style={
        typeof style === "function"
          ? (state) =>
              ({ "--gap": spacing, ...style(state) }) as React.CSSProperties
          : ({ "--gap": spacing, ...style } as React.CSSProperties)
      }
      className={cn(styles.root, spacing === 0 && styles.joined, className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

/** One option in a `ToggleGroup`. Takes the group's `variant` and `size`. Needs a `value`. */
function ToggleGroupItem({
  className,
  variant,
  size,
  ...props
}: TogglePrimitive.Props & ToggleGroupContextValue) {
  const context = React.useContext(ToggleGroupContext)
  const itemVariant = context.variant ?? variant ?? "default"
  const itemSize = context.size ?? size ?? "default"

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={itemVariant}
      data-size={itemSize}
      className={
        typeof className === "function"
          ? (state) =>
              toggleVariants({
                variant: itemVariant,
                size: itemSize,
                className: cn(styles.item, className(state)),
              })
          : toggleVariants({
              variant: itemVariant,
              size: itemSize,
              className: cn(styles.item, className),
            })
      }
      {...props}
    />
  )
}

export { ToggleGroup, ToggleGroupItem, type ToggleGroupProps }
