"use client"

import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cn } from "cn"

import { Separator } from "../Separator"
import styles from "./ButtonGroup.module.css"

const orientationClass = {
  horizontal: styles.horizontal,
  vertical: styles.vertical,
} as const

type ButtonGroupOrientation = keyof typeof orientationClass

type ButtonGroupProps = React.ComponentProps<"div"> & {
  /** `horizontal`: one row. `vertical`: one column. */
  orientation?: ButtonGroupOrientation
}

/**
 * Joins related buttons (and inputs or selects) into one bar.
 * It's a `role="group"`: name it with `aria-label`.
 */
function ButtonGroup({
  className,
  orientation = "horizontal",
  ...props
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(styles.root, orientationClass[orientation], className)}
      {...props}
    />
  )
}

/** A non-interactive label or unit inside the group, e.g. "AU$". */
function ButtonGroupText({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">({ className: cn(styles.text, className) }, props),
    render,
    state: { slot: "button-group-text" },
  })
}

/** Line between buttons that have no border of their own (e.g. `default` or `secondary`). */
function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(styles.separator, className)}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  type ButtonGroupOrientation,
  type ButtonGroupProps,
}
