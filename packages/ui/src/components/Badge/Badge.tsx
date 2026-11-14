"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"

import styles from "./Badge.module.css"

const variantClass = {
  default: styles.variantDefault,
  secondary: styles.variantSecondary,
  outline: styles.variantOutline,
  destructive: styles.variantDestructive,
  success: styles.variantSuccess,
  warning: styles.variantWarning,
} as const

type BadgeVariant = keyof typeof variantClass

type BadgeProps = useRender.ComponentProps<"span"> & {
  /** Meaning of the label: `success` / `warning` / `destructive` for statuses and risk levels. */
  variant?: BadgeVariant
}

/** Short status label. Use `render={<a href="…" />}` to make it a link. */
function Badge({
  className,
  variant = "default",
  render,
  ...props
}: BadgeProps) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(styles.root, variantClass[variant], className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, type BadgeProps, type BadgeVariant }
