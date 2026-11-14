import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cn } from "cn"

import styles from "./Button.module.css"

const variantClass = {
  default: styles.variantDefault,
  outline: styles.variantOutline,
  secondary: styles.variantSecondary,
  ghost: styles.variantGhost,
  destructive: styles.variantDestructive,
  link: styles.variantLink,
} as const

const sizeClass = {
  default: styles.sizeDefault,
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  lg: styles.sizeLg,
  icon: styles.sizeIcon,
  "icon-xs": styles.sizeIconXs,
  "icon-sm": styles.sizeIconSm,
  "icon-lg": styles.sizeIconLg,
} as const

type ButtonVariant = keyof typeof variantClass
type ButtonSize = keyof typeof sizeClass

type ButtonStyleOptions = {
  /** Visual emphasis. */
  variant?: ButtonVariant
  /** Height and padding; `icon*` sizes are square. */
  size?: ButtonSize
  /** Stretch to the container width, e.g. Login/Register submit buttons. */
  fullWidth?: boolean
}

/**
 * Class names for a button look. Use on elements that aren't a `<Button>`,
 * e.g. a Next.js `<Link className={buttonVariants({ variant: "outline" })}>`.
 */
function buttonVariants({
  variant = "default",
  size = "default",
  fullWidth = false,
  className,
}: ButtonStyleOptions & { className?: string } = {}) {
  return cn(
    styles.root,
    variantClass[variant],
    sizeClass[size],
    fullWidth && styles.fullWidth,
    className
  )
}

type ButtonProps = ButtonPrimitive.Props & ButtonStyleOptions

function Button({
  className,
  variant,
  size,
  fullWidth,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant ?? "default"}
      data-size={size ?? "default"}
      className={
        typeof className === "function"
          ? (state) =>
              buttonVariants({
                variant,
                size,
                fullWidth,
                className: className(state),
              })
          : buttonVariants({ variant, size, fullWidth, className })
      }
      {...props}
    />
  )
}

export {
  Button,
  buttonVariants,
  type ButtonProps,
  type ButtonSize,
  type ButtonVariant,
}
