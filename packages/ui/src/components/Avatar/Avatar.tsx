import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { cn } from "cn"

import styles from "./Avatar.module.css"

const sizeClass = {
  sm: styles.sizeSm,
  default: styles.sizeDefault,
  lg: styles.sizeLg,
} as const

type AvatarSize = keyof typeof sizeClass

type AvatarProps = AvatarPrimitive.Root.Props & {
  /** `sm` 24px, `default` 32px, `lg` 40px. */
  size?: AvatarSize
}

/** Round profile picture. Shows `AvatarFallback` (initials) until the image loads, or if it fails. */
function Avatar({ className, size = "default", ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(styles.root, sizeClass[size], className)}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(styles.image, className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(styles.fallback, className)}
      {...props}
    />
  )
}

/** Small dot in the bottom-right corner, e.g. a status. */
function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(styles.badge, className)}
      {...props}
    />
  )
}

/** Overlapping row of avatars. */
function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(styles.group, className)}
      {...props}
    />
  )
}

/** "+3" circle at the end of an `AvatarGroup`. */
function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(styles.groupCount, className)}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  type AvatarProps,
  type AvatarSize,
}
