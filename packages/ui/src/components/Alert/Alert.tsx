import * as React from "react"
import { cn } from "cn"

import styles from "./Alert.module.css"

const variantClass = {
  default: styles.variantDefault,
  destructive: styles.variantDestructive,
} as const

type AlertVariant = keyof typeof variantClass

type AlertProps = React.ComponentProps<"div"> & {
  /** `default`: neutral notice. `destructive`: error or something that needs fixing. */
  variant?: AlertVariant
}

/** Message box inside the page. Put an icon first to show it beside the title. */
function Alert({ className, variant = "default", ...props }: AlertProps) {
  return (
    <div
      data-slot="alert"
      data-variant={variant}
      role="alert"
      className={cn(styles.root, variantClass[variant], className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(styles.title, className)}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(styles.description, className)}
      {...props}
    />
  )
}

/** Top-right slot for a small action, e.g. a `Button size="xs"`. */
function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn(styles.action, className)}
      {...props}
    />
  )
}

export {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  type AlertProps,
  type AlertVariant,
}
