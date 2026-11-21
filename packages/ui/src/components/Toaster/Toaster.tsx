"use client"

import * as React from "react"
import {
  Alert02Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Loading03Icon,
  MultiplicationSignCircleIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "cn"
import { Toaster as Sonner, toast, type ToasterProps } from "sonner"

import styles from "./Toaster.module.css"

// Follows the `.dark` class on <html> (the library's dark-mode switch),
// instead of shadcn's next-themes dependency.
function subscribeToDarkClass(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

const isDarkClassSet = () =>
  document.documentElement.classList.contains("dark")

/**
 * Renders toasts sent with `toast()`. Mount it once, near the root of the app.
 * Light/dark follows the `.dark` class on `<html>` unless `theme` is passed.
 */
function Toaster({ className, theme, style, ...props }: ToasterProps) {
  const isDark = React.useSyncExternalStore(
    subscribeToDarkClass,
    isDarkClassSet,
    () => false
  )

  return (
    <Sonner
      theme={theme ?? (isDark ? "dark" : "light")}
      className={cn(styles.toaster, className)}
      icons={{
        success: (
          <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className={styles.icon} />
        ),
        info: (
          <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} className={styles.icon} />
        ),
        warning: (
          <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className={styles.icon} />
        ),
        error: (
          <HugeiconsIcon
            icon={MultiplicationSignCircleIcon}
            strokeWidth={2}
            className={styles.icon}
          />
        ),
        loading: (
          <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className={styles.spinner} />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster, toast, type ToasterProps }
