import * as React from "react"
import { cn } from "cn"

import styles from "./Textarea.module.css"

/** Multi-line text field. Grows with its content (where the browser supports it). */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(styles.root, className)}
      {...props}
    />
  )
}

export { Textarea }
