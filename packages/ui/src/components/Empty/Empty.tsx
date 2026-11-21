import * as React from "react"
import { cn } from "cn"

import styles from "./Empty.module.css"

const mediaVariantClass = {
  default: styles.mediaDefault,
  icon: styles.mediaIcon,
} as const

type EmptyMediaVariant = keyof typeof mediaVariantClass

/** Empty state: shown where a list or page has nothing yet. Add `border` for a dashed outline. */
function Empty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="empty" className={cn(styles.root, className)} {...props} />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn(styles.header, className)}
      {...props}
    />
  )
}

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  /** `default`: the image or icon as is. `icon`: icon in a 40px grey square. */
  variant?: EmptyMediaVariant
}) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(styles.media, mediaVariantClass[variant], className)}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn(styles.title, className)}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-description"
      className={cn(styles.description, className)}
      {...props}
    />
  )
}

/** Holds the next step, e.g. a `Button`. */
function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className={cn(styles.content, className)}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  type EmptyMediaVariant,
}
