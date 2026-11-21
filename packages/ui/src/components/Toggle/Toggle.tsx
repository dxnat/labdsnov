import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cn } from "cn"

import styles from "./Toggle.module.css"

const variantClass = {
  default: styles.variantDefault,
  outline: styles.variantOutline,
} as const

const sizeClass = {
  default: styles.sizeDefault,
  sm: styles.sizeSm,
  lg: styles.sizeLg,
} as const

type ToggleVariant = keyof typeof variantClass
type ToggleSize = keyof typeof sizeClass

type ToggleStyleOptions = {
  /** `default`: no border until pressed. `outline`: always has a border. */
  variant?: ToggleVariant
  /** Height and padding. */
  size?: ToggleSize
}

/** Class names for a toggle look. Used by `ToggleGroupItem`. */
function toggleVariants({
  variant = "default",
  size = "default",
  className,
}: ToggleStyleOptions & { className?: string } = {}) {
  return cn(styles.root, variantClass[variant], sizeClass[size], className)
}

type ToggleProps = TogglePrimitive.Props & ToggleStyleOptions

/** A button that stays pressed or unpressed, e.g. show/hide a chart series. */
function Toggle({ className, variant, size, ...props }: ToggleProps) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      data-variant={variant ?? "default"}
      data-size={size ?? "default"}
      className={
        typeof className === "function"
          ? (state) =>
              toggleVariants({ variant, size, className: className(state) })
          : toggleVariants({ variant, size, className })
      }
      {...props}
    />
  )
}

export {
  Toggle,
  toggleVariants,
  type ToggleProps,
  type ToggleSize,
  type ToggleVariant,
}
