import * as React from "react"
import { Loading03Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "cn"

import styles from "./Spinner.module.css"

type SpinnerProps = Omit<React.ComponentProps<typeof HugeiconsIcon>, "icon">

/** Spinning loading icon, announced as "กำลังโหลด". Inherits the text colour and size. */
function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <HugeiconsIcon
      icon={Loading03Icon}
      strokeWidth={2}
      data-slot="spinner"
      role="status"
      aria-label="กำลังโหลด"
      className={cn(styles.root, className)}
      {...props}
    />
  )
}

export { Spinner, type SpinnerProps }
