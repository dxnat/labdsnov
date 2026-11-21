import * as React from "react"
import { cn } from "cn"

import { Button } from "../Button"
import { Input } from "../Input"
import { Textarea } from "../Textarea"

import styles from "./InputGroup.module.css"

const addonAlignClass = {
  "inline-start": styles.addonInlineStart,
  "inline-end": styles.addonInlineEnd,
  "block-start": styles.addonBlockStart,
  "block-end": styles.addonBlockEnd,
} as const

type InputGroupAddonAlign = keyof typeof addonAlignClass

const buttonSizeClass = {
  xs: styles.buttonXs,
  sm: styles.buttonSm,
  "icon-xs": styles.buttonIconXs,
  "icon-sm": styles.buttonIconSm,
} as const

type InputGroupButtonSize = keyof typeof buttonSizeClass

/**
 * An input with things attached inside its border: icons, text such as
 * "AU$", or buttons. Looks like Input `filled`; the ring shows when the
 * inner input has focus.
 */
function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(styles.root, className)}
      {...props}
    />
  )
}

/** Icon, text or button inside the group. Clicking it (outside a button) focuses the input. */
function InputGroupAddon({
  className,
  align = "inline-start",
  onClick,
  ...props
}: React.ComponentProps<"div"> & {
  /** `inline-start` / `inline-end`: left / right of the input. `block-start` / `block-end`: a row above / below it. */
  align?: InputGroupAddonAlign
}) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(styles.addon, addonAlignClass[align], className)}
      onClick={(event) => {
        onClick?.(event)
        if ((event.target as HTMLElement).closest("button")) {
          return
        }
        event.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

/** Small ghost button for use inside an `InputGroupAddon`. */
function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> & {
  size?: InputGroupButtonSize
  type?: "button" | "submit" | "reset"
}) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(styles.button, buttonSizeClass[size], className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn(styles.text, className)} {...props} />
}

/** The `Input` inside the group, without its own background, border or ring. */
function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(styles.control, className)}
      {...props}
    />
  )
}

/** The `Textarea` inside the group, without its own background, border or ring. */
function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(styles.control, styles.controlTextarea, className)}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
  type InputGroupAddonAlign,
  type InputGroupButtonSize,
}
