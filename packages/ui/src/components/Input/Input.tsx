import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

import styles from "./Input.module.css"

const variantClass = {
  filled: styles.variantFilled,
  outline: styles.variantOutline,
} as const

type InputVariant = keyof typeof variantClass

type InputProps = React.ComponentProps<"input"> & {
  /** `filled` (default): tinted, borderless. `outline`: bordered, transparent. */
  variant?: InputVariant
}

function Input({ className, type, variant = "filled", ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      data-variant={variant}
      className={cn(styles.root, variantClass[variant], className)}
      {...props}
    />
  )
}

export { Input, type InputProps, type InputVariant }
