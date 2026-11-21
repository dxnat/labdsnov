import * as React from "react"
import { cn } from "cn"

import styles from "./Card.module.css"

const sizeClass = {
  default: styles.sizeDefault,
  sm: styles.sizeSm,
} as const

type CardSize = keyof typeof sizeClass

type CardProps = React.ComponentProps<"div"> & {
  /** Inner spacing: `default` 24px, `sm` 16px. */
  size?: CardSize
}

/** Surface that groups related content, e.g. an account summary. */
function Card({ className, size = "default", ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(styles.root, sizeClass[size], className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(styles.header, className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(styles.title, className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(styles.description, className)}
      {...props}
    />
  )
}

/** Top-right slot in the header, e.g. a ghost icon button or a `Badge`. */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(styles.action, className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(styles.content, className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(styles.footer, className)}
      {...props}
    />
  )
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardProps,
  type CardSize,
}
