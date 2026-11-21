import * as React from "react"
import { cn } from "cn"

import styles from "./Skeleton.module.css"

/** Pulsing placeholder shown while content loads. Size it with `className` to match the content. */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(styles.root, className)}
      {...props}
    />
  )
}

export { Skeleton }
